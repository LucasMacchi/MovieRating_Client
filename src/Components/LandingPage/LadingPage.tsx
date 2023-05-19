import "./LandingPage.css"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField'
import { Box, IconButton } from "@mui/material";
import {  useState } from "react";
import MoviesCards from "../movieCard/moviesCards";
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import LogoutIcon from '@mui/icons-material/Logout';
import {useCookies} from "react-cookie"

//redux
import { searchMoviesByName, emptyMovies } from "../../Store/moviesSlice";
import { loginMenu, logout } from "../../Store/configSlice";
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { logoutUser, emptyUserState } from "../../Store/userSlice";

import Login from "../LoginPage/Login";

export default function LandingPage() {
    const [cookies] = useCookies()
    const movies = useAppSelector((state) => state.moviesSlice)
    const user = useAppSelector((state) => state.userSlice)
    const config = useAppSelector((state) => state.configSlice)
    
    const [search, setSearch] = useState("")
    const [error, setError] = useState({
        error: false,
        message: ""
    })
    const [loading, setLoading] = useState(false)

    const dispatcher = useAppDispatch()

    //Updates the search bar 
    const searchBarData = (e: string) => {
        checkMovies()
        setSearch(e)
    }

    //search for movies that match the string given
    const searchMovieSubmit = (e: any) => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
        setLoading(true)
        dispatcher(emptyMovies())
        dispatcher(searchMoviesByName(search))
        e.preventDefault()

    }


    const logoSmall = [100, 100]
    const logoBig = [300, 300]
    //"hiddes" loggo after searching for movies
    const logoHidder = () => {
        if(movies.length === 0){
            return (
                <Zoom in={true}>
                    <img src="logo.png" alt="" width={logoBig[0]} height={logoBig[1]}/>
                </Zoom>
                
            )
        }
        else{
            return (<img src="logo.png" alt="" width={logoSmall[0]} height={logoSmall[1]}/>)
        }

    }
    //Check if any movie was found
    const checkMovies = () => {
        if(search.length < 2){
            setError({
                error: true,
                message: "Name is to short."
            })
        }
        else{
            setError({
                error: false,
                message: ""
            })
        }
    }
    //When the page is reload, the movies get reset
    window.addEventListener("beforeunload", () => {
        dispatcher(emptyMovies())
    })
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
                    <Button variant="contained" color="secondary" onClick={() => dispatcher(loginMenu())}>LOGIN</Button>
                </div>
            )
        }
    }
    const logoutBtn = async () => {
        if(config.isLogged){
            console.log(cookies.session_id)
            await logoutUser(cookies.session_id, dispatcher)
            dispatcher(logout())
            window.location.reload()
        }
        
    }
    //renders the cards of movies or the loading circle
    const moviesCards = () => {
        if(movies.length > 0){
            return(
                <div>
                    {loading ? <CircularProgress color="secondary" size={40} sx={{marginTop: 8, }}/> : <MoviesCards/>}
                </div>
                
            )

        }
    }
    //Renders the component to login
    const loginRender = () => {
        if(config.loginMenu){
            return(
                <Login/>
             )
        }
    }

    return (
        <div>
            <div>
                {loginShower()}
            </div>

            <div id="searchDiv">
                {loginRender()}
                {logoHidder()}
                <div>
                    <Slide in={true} direction="right">
                        <Box component="form" onSubmit={(e) => searchMovieSubmit(e)} sx={{width: 700,maxWidth: "100%", display: config.loginMenu ? "none" :"flex"}}>
                            <TextField
                            id="movieSearchBar"
                            label="Movie Search"
                            value={search}
                            onChange={ (e) => searchBarData(e.target.value) }
                            fullWidth
                            variant="outlined" 
                            color="secondary"
                            error={error.error}
                            helperText={error.message}
                            disabled={config.loginMenu}
                            
                            />
                            <Button type="submit" id="searchBtn" variant="contained" color="secondary" startIcon={<SearchIcon/>} disabled={error.error || config.loginMenu}>SEARCH</Button>
                        </Box>
                    </Slide>
                </div>
                <div>
                    {moviesCards()}
                    
                </div>

            </div>
            <div>
                
            </div>
        </div>
    )
}