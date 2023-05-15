import { Box, TextField, Button, Backdrop, Alert, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import {  useState } from "react";
import {useCookies} from "react-cookie"
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import { getUserData, loginUser, getUserInfo } from "../../Store/userSlice";

export default function Login(){

    const dispacher =  useAppDispatch()
    const userGlobal = useAppSelector(state => state.userSlice)
    const [cookies, setCookies, removeCookies] = useCookies()

    const [backdrop, setBackdrop] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [errorE, setErrorE] = useState({
        error: false,
        message: ""
    })
    const [errorP, setErrorP] = useState({
        error: false,
        message: ""
    })


    const handleEmail = (e: string) => {
        setUser({email: e, password: user.password})
    }
    const handlePassword = (e: string) => {
        setUser({email: user.email, password: e})

    }
    const handleBtnEnable = () => {
        if(user.email && user.password){
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
        if(error){
            return(
                <Alert variant="filled" severity="error">Email or Password is incorrect</Alert>
            )
        }
    }

    return (
        <div>
            <Backdrop open={backdrop} >
            <Box component="form" onSubmit={(e) => handleLogin(e)} sx={{width: 400, height: 300, p: 5, borderRadius: 5}} bgcolor="Menu">
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h4" >Login</Typography>
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
                    error={errorE.error}
                    helperText={errorE.message}
                    fullWidth
                    sx={{marginTop: 4, marginBottom: 4}}
                />
                <TextField
                    id="password"
                    label="password"
                    value={user.password}
                    onChange={(e) => handlePassword(e.target.value)}
                    variant="outlined" 
                    color="secondary"
                    error={errorP.error}
                    helperText={errorP.message}
                    fullWidth
                    sx={{marginTop: 4, marginBottom: 2}}
                />
                {handleLoginError()}
                <Box sx={{display: "flex", justifyContent: "flex-end"}} >
                    <Button type="submit" disabled={handleBtnEnable()} color="secondary" variant="contained" sx={{marginTop: 2}} endIcon={<LoginIcon/>} >
                        LOGIN
                    </Button>
                </Box>
            </Box>
            </Backdrop>


        </div>
    )
}