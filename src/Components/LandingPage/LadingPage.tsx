import "./LandingPage.css"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField'
import { Box } from "@mui/material";
import {  useEffect, useState } from "react";
import MoviesCards from "../movieCard/moviesCards";
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
//redux
import { searchMoviesByName, emptyMovies } from "../../Store/moviesSlice";
import { useAppDispatch, useAppSelector } from '../../Store/hooks';

export default function LandingPage() {

    const movies = useAppSelector((state) => state.movies)
    
    const [search, setSearch] = useState("")
    const [error, setError] = useState({
        error: false,
        message: ""
    })
    const [loading, setLoading] = useState(false)


    const login = false 
    const dispatcher = useAppDispatch()

    //Updates the search bar 
    const searchBarData = (e: string) => {
        setSearch(e)
    }

    //search for movies that match the string given
    const searchMovieSubmit = (e: any) => {
        setTimeout(() => {
            setLoading(false)
            e.preventDefault()
            dispatcher(searchMoviesByName(search))
        }, 2000)
        e.preventDefault()
        dispatcher(emptyMovies())
        setLoading(true)
    }

    useEffect(() => {
        dispatcher(emptyMovies())
    },[])

    const showLoading = () => {
        if(loading){
            return(
                <CircularProgress color="secondary" sx={{marginLeft: 3, }}/>
            )
        }
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

    /* Error checker
    const checkMovies = () => {
        if(!movies.length){
            setError({
                error: true,
                message: "Can't find movies that match the one searched."
            })
        }
        else{
            setError({
                error: false,
                message: ""
            })
        }
    }
    */

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
                    <Button variant="contained" color="secondary">LOGIN</Button>
                </div>
            )
        }
    }

    const moviesCards = () => {
        if(movies.length > 0){
            return(
                <MoviesCards/>
            )
        }
    }

    return (
        <div>
            <div>
                {loginShower()}
            </div>

            <div id="searchDiv">
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
                            <Button type="submit" id="searchBtn" variant="contained" color="secondary" startIcon={<SearchIcon/>}>SEARCH</Button>
                            {showLoading()}
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