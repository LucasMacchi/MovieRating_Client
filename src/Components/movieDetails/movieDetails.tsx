
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import { searchMovieDetail, emptyDetails } from "../../Store/movieDetailsSlice"
import { useParams } from "react-router-dom"
import { CardMedia, Card, Typography, Box, Rating } from "@mui/material"

export default function MovieDetails(){

    const details = useAppSelector((state) => state.detailSlice)
    const dispatcher = useAppDispatch()
    const {movieid} = useParams()

    window.addEventListener("beforeunload", () => {
        dispatcher(emptyDetails())
    })

    useEffect(() => {
        dispatcher(searchMovieDetail(movieid ? movieid : ""))
    },[])

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
                
                <Rating name="Rating" readOnly value={2} sx={{ display: "flex",justifyContent: "center", m: 5}}/>
                <Typography gutterBottom variant="h3" component="div" color="white" >
                    {details.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div" color="white" >
                    {details.synopsis}
                </Typography>
            </Card>
        </div>
    )
}