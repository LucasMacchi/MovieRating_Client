
import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import { searchMovieDetail, emptyDetails } from "../../Store/movieDetailsSlice"
import { getReviewsFromMovie, emptyReviews, getReviewsRating } from "../../Store/movieReviewsSlice"
import { useParams } from "react-router-dom"
import { CardMedia, Card, Typography, Box, Rating, Backdrop, CircularProgress } from "@mui/material"
import ReviewCards from "../Review/Review"
import ReviewMaker from "../ReviewMaker/ReviewMaker"

export default function MovieDetails(){

    const details = useAppSelector((state) => state.detailSlice)
    const reviews = useAppSelector((state) => state.movieReviewsSlice)
    const dispatcher = useAppDispatch()
    const {movieid} = useParams()
    const [rate, setRating] = useState(0)
    const [loading, setLoading] = useState(true)

    window.addEventListener("beforeunload", () => {
        dispatcher(emptyDetails())
        dispatcher(emptyReviews())
    })

    useEffect(() => {
        dispatcher(emptyReviews())
        dispatcher(searchMovieDetail(movieid ? movieid : ""))
        dispatcher(getReviewsFromMovie(movieid ? movieid : ""))
        setTimeout(() => {
            setLoading(false)
            
        }, 1000);

    },[])



    useEffect(() => {
        setRating(getReviewsRating(reviews))
    },[reviews])

    const load = () => {
        if(loading) {
            return(
                <div>
                    <Backdrop open={true}>
                        <CircularProgress color="secondary"/>
                    </Backdrop>
                </div>
            )
        }
        else {
            return(
                <div>
                <Card 
                sx={{
                    width: 800,
                    height: 600, 
                 }}
                >
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <CardMedia
                        sx={{ height: 300, width: 300 }}
                        image={details.posterImage}
                        />
                    </Box>
                    
                    <Rating name="Rating" readOnly value={rate} size="large" sx={{ display: "flex",justifyContent: "center", m: 5}}/>
                    <Typography gutterBottom variant="h3" component="div" color="white" >
                        {details.name}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div" color="white" >
                        {details.synopsis}
                    </Typography>
                </Card>
                <ReviewMaker/>
                <ReviewCards/>
                </div>
            )
        }
    }

    return(
        <div id="DivDetails">
            {load()}
        </div>
    )
}