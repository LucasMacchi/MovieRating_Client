import {  useAppSelector } from '../../Store/hooks';
import {useNavigate} from "react-router-dom"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import {   useState } from "react";
import "./moviesCards.css"
import { movies } from '../../Store/moviesSlice';


export default function MoviesCards () {

    const movies = useAppSelector((state) => state.moviesSlice)
    const [pagination, setPage] = useState({
        size: 2,
        mountPages: movies.length,
        page: 1,
        index: 0
    })
    const navigate = useNavigate()
    
    const changePage = (e: React.ChangeEvent<unknown>, value: number) => {
        setPage({
            ...pagination,
            page: value,
            index: value - 1
        })
    }

    const createCards = () => {
        return(
            <div id='cardsDiv'>
            {movies[pagination.index].map((m:movies) => (
            
                <Card sx={{maxHeight: 500, maxWidth: 300, margin: 5}} key={m.name}>
                    <CardMedia
                        sx={{ height: 300, width: 300 }}
                        image={m.imageUrl}
                        title={m.name}
                    />
                    <CardContent >
                    <Typography gutterBottom variant="h6" component="div" color="white" >
                        {m.name}
                    </Typography>
                    <CardActions>
                        <Button variant='outlined' onClick={() => navigate("/movie/"+m.movieId)}>OPEN</Button>
                    </CardActions>
                    </CardContent>
                </Card>
            
            ))}
            </div>
        )
  
    }

    return(
        <div id="cardPagdiv">
            {createCards()}
        <Pagination count={pagination.mountPages} color='secondary' page={pagination.page} onChange={changePage}/>
        </div>
       
    )
}

/*
            {movies[pagination.index].map((m:movies) => (
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Card sx={{maxHeight: 500, maxWidth: 300, margin: 5}} >
                    <CardMedia
                        sx={{ height: 300, width: 300 }}
                        image={m.imageUrl}
                        title={m.name}
                    />
                    <CardContent >
                    <Typography gutterBottom variant="h6" component="div" color="white" >
                        {m.name}
                    </Typography>
                    <CardActions>
                        <Button variant='outlined'>OPEN</Button>
                    </CardActions>
                    </CardContent>
                </Card>
            </Slide>
            ))}   
*/