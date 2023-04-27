import "./LandingPage.css"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField'
import { Box } from "@mui/material";
import { useState } from "react";
//redux
import { searchMoviesByName } from "../../Store/moviesSlice";
import { useAppDispatch, useAppSelector } from '../../Store/hooks';

export default function LandingPage() {

    const [search, setSearch] = useState("")
    const [error, setError] = useState({
        error: false,
        message: ""
    })
    const login = false
    const movies = useAppSelector((state) => state.movies)
    const dispatcher = useAppDispatch()

    //Updates the search bar 
    const searchBarData = (e: string) => {
        setSearch(e)
    }

    //search for movies that match the string given
    const searchMovieSubmit = (e: any) => {
        e.preventDefault()
        dispatcher(searchMoviesByName(search))
    }

    /*
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
                    <Button color='secondary'>USERNAME</Button>
                </div>
            )
        }
        else{
            return(
                <div id='userNameIcon'>
                    <Button variant="contained" color="secondary" >LOGIN</Button>
                </div>
            )
        }
    }

    return (
        <div>
            <div>
                {loginShower()}
            </div>

            <div id="searchDiv">
                <img src="logo.png" alt=""/>
                <div>
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
                    </Box>

                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}