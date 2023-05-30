import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { logout } from "../../Store/configSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button/Button';
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser, emptyUserState } from "../../Store/userSlice";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


export default function Header(){

    const navigate = useNavigate()
    const [cookies] = useCookies()
    const config = useAppSelector((state) => state.configSlice)
    const user = useAppSelector((state) => state.userSlice)
    const dispatcher = useAppDispatch()

    const logoutBtn = async () => {
        if(config.isLogged){
            console.log(cookies.session_id)
            await logoutUser(cookies.session_id, dispatcher)
            dispatcher(logout())
            window.location.reload()
        }
        
    }

    //Renders the name of user or the login button
    const loginShower = () => {
        if(config.isLogged){
            return(
                <div id='userNameIcon'>
                    <AccountCircleIcon color='secondary' fontSize='large'/>
                    <Button color='secondary' >{user.username}</Button>
                    <IconButton onClick={() => logoutBtn()}>
                      <LogoutIcon color="secondary"/>
                    </IconButton>
                </div>
            )
        }
        else{
            return(
                <div id='userNameIcon'>
                    <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>LOGIN</Button>
                </div>
            )
        }
    }

    return(
        <div>
            {loginShower()}
        </div>
    )
}