import {  useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { Box, TextField, Button, Backdrop, Alert, IconButton, Typography, CircularProgress, Link } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import { changePassword } from "../../Store/userSlice";
import { useParams } from "react-router-dom";

export default function PasswordReset(){

    const [passwordData, setPasswords] = useState({
        password: "",
        passwordCon: ""
    })

    const {token} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        handlePasswordErrors()
        handlePasswordConfirmation()
        /////////////////////////
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[passwordData])

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorPassword, SetErrorPassword] = useState({error: false, message: ""})
    const [errorPasswordCon, SetErrorPasswordCon] = useState({error: false, message: ""})

    const handlePasswordErrors = () => {
        const passwordValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
        if(passwordData.password.length < 7 || !passwordValidator.test(passwordData.password)) SetErrorPassword({error:true, message: "password need at least 8 character, one uppercase and one number"})
        else {SetErrorPassword({error: false, message: ""})}
    }
    const handlePasswordConfirmation = () => {
        if(passwordData.passwordCon !== passwordData.password || passwordData.passwordCon.length === 0) SetErrorPasswordCon({error: true, message: "Passwords doesn't match"})
        else {SetErrorPasswordCon({error: false, message: ""})}
    }
    const handlePassword = (e: string) => {
        setPasswords({...passwordData, password: e})
    }
    const handlePasswordCon = (e: string) => {
        setPasswords({...passwordData, passwordCon: e})
    }

    const handleBtnEnable = () => {
        if(errorPassword.error || errorPasswordCon.error) return true
        else return false
    }

    const loadingBtn = () => {
        if(loading){
            return(
                <CircularProgress color="secondary"/>
            )
        }
        else{
            return(
                <Button type="submit" disabled={handleBtnEnable()} color="secondary" variant="contained" sx={{marginTop: 2}} endIcon={<KeyIcon/>} >
                CHANGE PASSWORD
                </Button>
            )
        }
    }

    const alertHandler = () => {
        if(success && !error){
            return(
                <Alert variant="filled" severity="success">Password successfully change!</Alert>
            )
        }
        if(error && !success){
            return(
                <Alert variant="filled" severity="error">Error while changing password</Alert>
            )
        }
    }

    const handlePasswordSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const response = await changePassword(token ? token : "NO TOKEN", passwordData.password)
        setPasswords({password: "", passwordCon: ""})
        if(response){
            setTimeout(() => {
                setLoading(false)
                setSuccess(true)
                
            }, 2000);
            setTimeout(() => {
                navigate("/")
            }, 3500);
        }
        else{
            setTimeout(() => {
                setLoading(false)
                setError(true)
            }, 2000);
        }
    }

    return (
        <div>
            <Backdrop open={true}>
            <Box component="form" onSubmit={(e) => handlePasswordSubmit(e)} sx={{width: 400, minheight: 300, p: 5, borderRadius: 5, justifyContent: "center"}} bgcolor="Menu">
                <Typography variant="h4" >RESET YOUR PASSWORD</Typography>
                <TextField
                    id="password"
                    label="Password"
                    value={passwordData.password}
                    onChange={(e) => handlePassword(e.target.value)}
                    variant="outlined" 
                    color="secondary"
                    error={errorPassword.error}
                    helperText={errorPassword.message}
                    fullWidth
                    type="password"
                    sx={{marginTop: 4, marginBottom: 0}}
                />
                    <TextField
                    id="passwordCon"
                    label="Password Confirmation"
                    value={passwordData.passwordCon}
                    onChange={(e) => handlePasswordCon(e.target.value)}
                    variant="outlined" 
                    color="secondary"
                    error={errorPasswordCon.error}
                    helperText={errorPasswordCon.message}
                    fullWidth
                    type="password"
                    sx={{marginTop: 2, marginBottom: 2}}
                />
                {alertHandler()}
                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                    {loadingBtn()}
                </Box>

            </Box>
            </Backdrop>
        </div>
    )


}