import {  useState, useEffect } from "react";
import { Box, TextField, Button, Backdrop, Alert, IconButton, Typography, CircularProgress, Link } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import { changePassword } from "../../Store/userSlice";

export default function PasswordReset(){

    const [passwordData, setPasswords] = useState({
        password: "",
        passwordCon: ""
    })

    useEffect(() => {
        handlePasswordErrors()
        handlePasswordConfirmation()
        /////////////////////////
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[passwordData])

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

    const handlePasswordSubmit = () => {

    }

    return (
        <div>
            <Backdrop open={true}>
            <Box component="form" onSubmit={(e) => handlePasswordSubmit()} sx={{width: 400, minheight: 300, p: 5, borderRadius: 5, justifyContent: "center"}} bgcolor="Menu">
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
                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button type="submit" disabled={handleBtnEnable()} color="secondary" variant="contained" sx={{marginTop: 2}} endIcon={<KeyIcon/>} >
                        CHANGE PASSWORD
                    </Button>
                </Box>

            </Box>
            </Backdrop>
        </div>
    )


}