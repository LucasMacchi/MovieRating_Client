import { Box, TextField, Button, Backdrop, Alert, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import React,{  useState, useEffect } from "react";
//import {useCookies} from "react-cookie"
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import {loginUser, getUserInfo, registerUser } from "../../Store/userSlice";
import dayjs, { Dayjs } from "dayjs";

export default function Login(){

    const dispacher =  useAppDispatch()
    const userGlobal = useAppSelector(state => state.userSlice)
    //const [cookies, setCookies, removeCookies] = useCookies()

    //const [test, setTest] = useState(false)
    const [signup, setSign] = useState(false)
    const [backdrop, setBackdrop] = useState(true)
    const [error, setError] = useState(false)
    const d = new Date()
    const [date, setDate] = useState<Dayjs | null>(dayjs(""))
    const [userSign, setUserSign] = useState({
        dateBirth: "",
        con_pass: "",
        username: ""
    })
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [errorEmail, SetErrorEmail] = useState({error: false, message: ""})
    const [errorPassword, SetErrorPassword] = useState({error: false, message: ""})
    const [errorPasswordCon, SetErrorPasswordCon] = useState({error: false, message: ""})
    const [errorUsername, SetErrorUsername] = useState({error: false, message: ""})
    const [errorDate, SetErrorDate] = useState({error: false, message: ""})

    useEffect(() => {
        handleEmailErrors()
        handlePasswordErrors()
        handlePasswordConfirmation()
        handleUsernameError()
        handleDateError()
        /////////////////////////
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user, userSign, date])

    useEffect(() => {clearData()},[signup])

    const handleEmailErrors = () => {
        const emailValidation = /^\S+@\S+\.\S+$/
        if(user.email.length === 0 || !emailValidation.test(user.email)) SetErrorEmail({error: true, message: "invalid email"})
        else{SetErrorEmail({error: false, message: ""})}
    }
    const handlePasswordErrors = () => {
        const passwordValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
        if(signup){
            if(user.password.length < 7 || !passwordValidator.test(user.password)) SetErrorPassword({error:true, message: "password need at least 8 character, one uppercase and one number"})
            else {SetErrorPassword({error: false, message: ""})}
        }
    }
    const handlePasswordConfirmation = () => {
        if(signup){
            if(userSign.con_pass !== user.password || userSign.con_pass.length === 0) SetErrorPasswordCon({error: true, message: "Passwords doesn't match"})
            else {SetErrorPasswordCon({error: false, message: ""})}
        }
    }
    const handleUsernameError = () => {
        if(signup) {
            if(userSign.username.length === 0) SetErrorUsername({error: true, message: "Passwords doesn't match"})
            else {SetErrorUsername({error: false, message: ""})}
        }
    }
    const handleDateError = () => {
        if(date && signup){
            if(date.diff(d, "year") > -18 || !userSign.dateBirth) {
                
                SetErrorDate({error: true, message: "You must be 18 or older"})
            }
            else SetErrorDate({error: false, message: ""})
        }
    }

    const clearData = () => {
        setUserSign({
            dateBirth: "",
            con_pass: "",
            username: ""
        })
        setUser({
            email: "",
            password: "",
        })

    }

    const handleEmail = (e: string) => {
        setUser({email: e, password: user.password})
    }
    const handlePassword = (e: string) => {
        setUser({email: user.email, password: e})
    }
    const handleConfirmation = (e: string) => {
        setUserSign({...userSign ,con_pass: e})
    }
    const handleUsername = (e: string) => {
        setUserSign({...userSign, username: e})
    }
    const handleDate = (e: Dayjs | null) => {
        setDate(e)
        if(e){
            const dateString = e?.date()+"/"+(e?.month() + 1)+"/"+e?.year()
            setUserSign({...userSign, dateBirth: dateString})
        }

    }
    const handleBtnEnable = () => {
        if(errorDate.error || errorEmail.error || errorPassword.error || errorPasswordCon.error || errorUsername.error || !user.password){
            return true
        }
        else{
            return false
        }
    }
    const handleLogin = async (e: any) => {
        e.preventDefault()
        if(!signup){
            console.log("Attemping Login")
            let validation = false
            try {
                validation = await loginUser(user.email,user.password)
                if(validation){
                    console.log("Getting user info")
                    dispacher(getUserInfo(user.email))
                    if(userGlobal.id){
                        console.log("Logged!")
                        setError(false)
                        setUser({email: "", password: ""})
                    }
                    else{
                        console.log("Error")
                        setError(true)
        
                    }
                }
            } catch (error) {
                setError(true)
            }
        }
        else{
            await registerUser(user.email, user.password, userSign.dateBirth, userSign.username)
        }

        
    }
    const handleLoginError = () => {
        if(error && !signup){
            return(
                <Alert variant="filled" severity="error">Email or Password is incorrect</Alert>
            )
        }
        
    }

    const registerRender = () => {
        if(signup){
            return(
                <Box >
                    <TextField
                    id="passwordCon"
                    label="Password Confirmation"
                    value={userSign.con_pass}
                    onChange={(e) => handleConfirmation(e.target.value)}
                    variant="outlined" 
                    color="secondary"
                    error={errorPasswordCon.error}
                    helperText={errorPasswordCon.message}
                    fullWidth
                    sx={{marginTop: 0, marginBottom: 2}}
                    />
                    <TextField
                    id="username"
                    label="Username"
                    value={userSign.username}
                    onChange={(e) => handleUsername(e.target.value)}
                    variant="outlined" 
                    color="secondary"
                    error={errorUsername.error}
                    helperText={errorUsername.message}
                    fullWidth
                    sx={{marginTop: 0, marginBottom: 2}}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={date} onChange={(v) => handleDate(v)} slotProps={{textField:{helperText: errorDate.message , error: errorDate.error}}}/>
                    </LocalizationProvider>
                </Box>

            )
        }
    }

    return (
        <div>
            <Backdrop open={backdrop} >
            <Box component="form" onSubmit={(e) => handleLogin(e)} sx={{width: 400, minheight: 300, p: 5, borderRadius: 5}} bgcolor="Menu">
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h4" >{signup ? "Sign up" : "Login"}</Typography>
                    <IconButton color="secondary" onClick={() => setBackdrop(false)}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <TextField
                    id="email"
                    label="Email"
                    value={user.email}
                    onChange={(e) => handleEmail(e.target.value)}
                    variant="outlined" 
                    color="secondary"
                    error={errorEmail.error}
                    helperText={errorEmail.message}
                    fullWidth
                    sx={{marginTop: 4, marginBottom: 0}}
                />
                <TextField
                    id="password"
                    label="Password"
                    value={user.password}
                    onChange={(e) => handlePassword(e.target.value)}
                    variant="outlined" 
                    color="secondary"
                    error={errorPassword.error}
                    helperText={errorPassword.message}
                    fullWidth
                    sx={{marginTop: 2, marginBottom: 2}}
                />
                
                {handleLoginError()}
                {registerRender()}
                <Box sx={{display: "flex", justifyContent: "space-between"}} >
                    <Button onClick={() => setSign(!signup)} color="secondary" variant="contained" sx={{marginTop: 2}} endIcon={signup ? <LoginIcon/> : <CreateIcon/>} >
                        {signup ? "LOGIN" : "SIGN UP"}
                    </Button>
                    <Button type="submit" disabled={handleBtnEnable()} color="secondary" variant="contained" sx={{marginTop: 2}} endIcon={signup ? <CreateIcon/> : <LoginIcon/>} >
                    {signup ? "SIGN UP" : "LOGIN"}
                    </Button>
                </Box>
            </Box>
            </Backdrop>


        </div>
    )
}