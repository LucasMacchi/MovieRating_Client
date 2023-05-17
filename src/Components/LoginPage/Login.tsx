import { Box, TextField, Button, Backdrop, Alert, IconButton, Typography, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { loginMenu } from "../../Store/configSlice";

import React,{  useState, useEffect } from "react";
//import {useCookies} from "react-cookie"
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import {loginUser, getUserInfo, registerUser, verifyUser } from "../../Store/userSlice";
import dayjs, { Dayjs } from "dayjs";

export default function Login(){

    const dispacher =  useAppDispatch()
    const userGlobal = useAppSelector(state => state.userSlice)
    const config = useAppSelector((state) => state.configSlice)
    //const [cookies, setCookies, removeCookies] = useCookies()
    
    const [verify, setVerify] = useState(false)
    const [loading, setLoading] = useState(false)
    const [codeActivation, setCodeActivation] = useState(true)
    const [codeData, setCodeData] = useState("")
    const [signup, setSign] = useState(false)
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
    const [errorCode, SetErrorCode] = useState({error: false, message: ""})


    useEffect(() => {
        handleEmailErrors()
        handlePasswordErrors()
        handlePasswordConfirmation()
        handleUsernameError()
        handleDateError()
        handleErrorCode()
        /////////////////////////
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user, userSign, date, codeData])

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
    const handleErrorCode = () => {
        const codeValidator = /^[0-9]*$/
        if(!codeValidator.test(codeData) || codeData.length === 0) SetErrorCode({error: true, message: "Code contains only numbers"})
        else {SetErrorCode({error: false, message: ""})}
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
            const response = await registerUser(user.email, user.password, userSign.dateBirth, userSign.username)
            if(response === "username"){
                SetErrorUsername({error:true, message: "Username Already taken"})
            }
            else if( response === "email"){
                SetErrorEmail({error:true, message: "Email Already taken"})
            }
            else{
                setCodeActivation(true)
            }
            
        }

        
    }
    const handleLoginError = () => {
        if(error && !signup){
            setTimeout(() => {
                setError(false)
            }, 5000);
            return(
                <Alert variant="filled" severity="error">Email or Password is incorrect</Alert>
            )
        }
        if(verify){
            setTimeout(() => {
                setVerify(false)
            }, 5000);
            return(
                <Alert variant="filled" severity="success">Account created and verify!</Alert>
            )
        }
        
    }

    const handleVerify = async () => {
        const response = await verifyUser(user.email, parseInt(codeData))
        if(response){
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setVerify(true)
                setCodeActivation(false)
                setSign(false)
            }, 2000);
        }
        else{
            SetErrorCode({error: true, message:"Wrong code!"})
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
            <Backdrop open={config.loginMenu} >
            <Box component="form" onSubmit={(e) => handleLogin(e)} sx={{width: 400, minheight: 300, p: 5, borderRadius: 5}} bgcolor="Menu">
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h4" >{signup ? "Sign up" : "Login"}</Typography>
                    <IconButton color="secondary" onClick={() => dispacher(loginMenu())}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                    <Box sx={{display: codeActivation ? "none" : "block"}}>
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
                <Box sx={{display: codeActivation ? "flex" : "none"}}>


                    <TextField
                            id="codeAc"
                            label="ActivationCode"
                            value={codeData}
                            onChange={(e) => setCodeData(e.target.value)}
                            variant="outlined" 
                            color="secondary"
                            error={errorCode.error}
                            helperText={errorCode.message}
                            fullWidth
                            sx={{marginTop: 2, marginBottom: 2}}
                    />

                </Box>
                <Box sx={{display: codeActivation ? "flex" : "none", justifyContent: "space-between"}}>
                    <IconButton onClick={() => setCodeActivation(false)}>
                        <ArrowBackIcon/>
                    </IconButton>
                    {loading ? <CircularProgress color="secondary"/> : <Button variant="contained" color="secondary" onClick={() => handleVerify()}>VERIFY</Button>}
                </Box>

            </Box>
            </Backdrop>


        </div>
    )
}