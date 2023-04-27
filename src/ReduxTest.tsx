import { searchMoviesByName, getMovies } from './Store/moviesSlice';
import { useAppDispatch, useAppSelector } from './Store/hooks';
import Button from "@mui/material/Button"



export default function ReduxTest() {
    const movies = useAppSelector((state) => state.movies)
    const dispatcher = useAppDispatch()
    return(
        <div>
            <h1>{movies.length}</h1>
            <Button variant="contained" onClick={() => dispatcher(searchMoviesByName("spider-man"))}>CLICK</Button>
            <Button variant="contained" onClick={() => dispatcher(getMovies())}>GET</Button>
        </div>
    )
}