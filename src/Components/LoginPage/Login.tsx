import { Box, TextField, Button, Backdrop, Alert, IconButton, Typography, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {  useState, useEffect } from "react";
import {useCookies} from "react-cookie"
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import { getUserData, loginUser, getUserInfo } from "../../Store/userSlice";
import dayjs, { Dayjs } from "dayjs";

export default function Login(){

    const dispacher =  useAppDispatch()
    const userGlobal = useAppSelector(state => state.userSlice)
    const [cookies, setCookies, removeCookies] = useCookies()

    const [signup, setSign] = useState(false)
    const [backdrop, setBackdrop] = useState(true)
    const [error, setError] = useState(false)
    const d = new Date()
    const [date, setDate] = useState<Dayjs | null>(dayjs(""))
    const [userSign, setUserSign] = useState({
        dateBirth: date?.date()+"-"+(date?.month() ? date?.month() + 1 : date?.month())+"-"+date?.year(),
        con_pass: "",
        username: ""
    })
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const errorDefault = {
        email:{
            error: false,
            message: ""  
        },
        password: {
            error: false,
            message: ""
        },
        passwordConfirmation: {
            error: false,
            message: ""
        },
        username: {
            error: false,
            message: ""
        },
        dateOfBirth: {
            error: false,
            message: ""
        }

    }
    const [errorForm, setErrorF] = useState(errorDefault)

    useEffect(() => {
        handleErrors()
    },[user, userSign, date])

    const handleErrors = () => {
        const emailValidation = /^\S+@\S+\.\S+$/
        const passwordValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
        if(user.email.length === 0 || !emailValidation.test(user.email)) setErrorF({...errorForm, email:{error: true, message: "invalid email"}})
        else{setErrorF({...errorForm, email:{error: false, message: ""}})}
        if(signup){
            if(user.password.length < 7 || !passwordValidator.test(user.password)) setErrorF({...errorForm, password:{error: true, message: "password need at least 8 character, one uppercase and one number"}})
            else {setErrorF({...errorForm, password:{error: false, message: ""}})}
            if(userSign.con_pass === user.password) setErrorF({...errorForm, passwordConfirmation:{error: true, message: "Passwords doesn't match"}})
            else {setErrorF({...errorForm, passwordConfirmation:{error: false, message: ""}})}
            if(userSign.username.length === 0) setErrorF({...errorForm, username:{error: true, message: "Username can't be empty"}})
            else{setErrorF({...errorForm, username:{error: false, message: ""}})}
            if(date){
                if(date.diff(d, "year") >= -18 ) {
                    setErrorF({...errorForm, dateOfBirth:{error: true, message: "You must be 18 or older"}})
                }
                else setErrorF({...errorForm, dateOfBirth:{error: false, message: ""}})
            }

        }  
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
    const handleBtnEnable = () => {
        if(!signup && user.email && user.password){
            return false
        }
        else if(user.email && user.password && userSign.con_pass && userSign.username && userSign.dateBirth) {
            return false
        }
        else{
            return true
        }
    }
    const handleLogin = async (e: any) => {
        e.preventDefault()
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
                    error={errorForm.passwordConfirmation.error}
                    helperText={errorForm.passwordConfirmation.message}
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
                    error={errorForm.username.error}
                    helperText={errorForm.username.message}
                    fullWidth
                    sx={{marginTop: 0, marginBottom: 2}}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={date} onChange={(v) => setDate(v)} slotProps={{textField:{helperText: errorForm.dateOfBirth.message , error: errorForm.dateOfBirth.error}}}/>
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
                    error={errorForm.email.error}
                    helperText={errorForm.email.message}
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
                    error={errorForm.password.error}
                    helperText={errorForm.password.message}
                    fullWidth
                    sx={{marginTop: 2, marginBottom: 2}}
                />
                {handleLoginError()}
                {registerRender()}
                <Box sx={{display: "flex", justifyContent: "space-between"}} >
                    <Button onClick={() => setSign(!signup)} color="secondary" variant="contained" sx={{marginTop: 2}} endIcon={<CreateIcon/>} >
                        {signup ? "LOGIN" : "SIGN UP"}
                    </Button>
                    <Button type="submit" disabled={handleBtnEnable()} color="secondary" variant="contained" sx={{marginTop: 2}} endIcon={<LoginIcon/>} >
                    {signup ? "SIGN UP" : "LOGIN"}
                    </Button>
                </Box>
            </Box>
            </Backdrop>


        </div>
    )
}