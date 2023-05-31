import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import { getReviewsFromMovie, emptyReviews, review, giveLike,checkLike } from "../../Store/movieReviewsSlice"
import { Card, CardContent, Rating, Typography, IconButton,Box } from "@mui/material"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FlagIcon from '@mui/icons-material/Flag';
export default function ReviewCards () {

    const reviews = useAppSelector((state) => state.movieReviewsSlice)
    const config = useAppSelector((state) => state.configSlice)
    const dispacher = useAppDispatch()

    const handleLike = (i: number) => {
        dispacher(giveLike(i))
        dispacher(checkLike(i))
        //---- dispacher gives a like to the review in the 
        
    }

    const handleReportReview = (review_id: string) => {
        //---dispacher that creates a report for that review
    }

    return(
        <div>
            {reviews.map((r,i) => (
                <Card sx={{width:700 ,minheight: 100,maxHeight:300, m: 5, borderRadius: 10}} key={i}>
                    <CardContent>
                        <Box sx={{display:"flex", justifyContent:"space-between"}}>
                            <Rating name="reviewRating" value={r.rating} readOnly/>
                            <IconButton onClick={() => handleReportReview(r.id)}>
                                <FlagIcon color="error"/>
                            </IconButton>
                        </Box>
                        
                        <Typography gutterBottom variant="h6" component="div" color="white">
                            {r.profileUser}
                        </Typography>
                        <Typography variant="body2" color="white" gutterBottom style={{wordWrap: "break-word"}}>
                            {r.comment}
                        </Typography>
                        <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                            <IconButton onClick={() => handleLike(i)} color={r.likeGiven ? "primary" : "default"} disabled={!config.isLogged}>
                                <ThumbUpAltIcon/>
                                {r.likes}
                            </IconButton>
                        </Box>

                    </CardContent>
                </Card>
            ))}
        </div>
    )

}