import "./LandingPage.css"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField'
import { Box } from "@mui/material";
import {  useState } from "react";
import MoviesCards from "../movieCard/moviesCards";
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
//redux
import { searchMoviesByName, emptyMovies } from "../../Store/moviesSlice";
import { useAppDispatch, useAppSelector } from '../../Store/hooks';

import Login from "../LoginPage/Login";

export default function LandingPage() {

    const movies = useAppSelector((state) => state.moviesSlice)
    const user = useAppSelector((state) => state.userSlice)
    
    const [Showlogin, setLogin] = useState(false)
    const [search, setSearch] = useState("")
    const [error, setError] = useState({
        error: false,
        message: ""
    })
    const [loading, setLoading] = useState(false)

    const dispatcher = useAppDispatch()
    const login = false
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
    
    window.addEventListener("beforeunload", () => {
        dispatcher(emptyMovies())
    })

    const loginShower = () => {
        if(login){
            return(
                <div id='userNameIcon'>
                    <AccountCircleIcon color='secondary' fontSize='large'/>
                    <Button color='secondary' >USERNAME</Button>
                </div>
            )
        }
        else{
            return(
                <div id='userNameIcon'>
                    <Button variant="contained" color="secondary" onClick={() => loginController()}>LOGIN</Button>
                </div>
            )
        }
    }

    const moviesCards = () => {
        if(movies.length > 0){
            return(
                <div>
                    {loading ? <CircularProgress color="secondary" size={40} sx={{marginTop: 8, }}/> : <MoviesCards/>}
                </div>
                
            )

        }
    }
    const loginMenu = () => {
        if(Showlogin){
            return(
                <Login/>
             )
        }
    }
    const loginController = () => {
        setLogin(false)
        setTimeout(() => {
            setLogin(true)
        }, 200);
        
    }

    return (
        <div>
            <div>
                {loginShower()}
            </div>

            <div id="searchDiv">
                {loginMenu()}
                {logoHidder()}
                <div>
                    <Slide in={true} direction="right">
                        <Box component="form" onSubmit={(e) => searchMovieSubmit(e)} sx={{width: 700,maxWidth: "100%", display: "flex"}}>
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
                            />
                            <Button type="submit" id="searchBtn" variant="contained" color="secondary" startIcon={<SearchIcon/>} disabled={error.error}>SEARCH</Button>
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