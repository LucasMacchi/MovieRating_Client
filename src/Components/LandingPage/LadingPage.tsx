import "./LandingPage.css"

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField'
import {Box} from "@mui/material";
import {  useState } from "react";
import MoviesCards from "../movieCard/moviesCards";
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

//redux
import { searchMoviesByName, emptyMovies } from "../../Store/moviesSlice";
import { useAppDispatch, useAppSelector } from '../../Store/hooks';


export default function LandingPage() {
    const movies = useAppSelector((state) => state.moviesSlice)
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

    return (
        <div>
            <div id="searchDiv">
                {logoHidder()}
                <div>
                    <Slide in={true} direction="right">
                        <Box component="form" onSubmit={(e) => searchMovieSubmit(e)} sx={{width: 700,maxWidth: "100%", display:"flex"}}>
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