import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import { getReviewsFromMovie, likeTrue, review, giveLike,checkLike } from "../../Store/movieReviewsSlice"
import { Card, CardContent, Rating, Typography, IconButton,Box } from "@mui/material"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FlagIcon from '@mui/icons-material/Flag';
import { userLike, userUnLike } from "../../Store/userSlice";
import { useEffect } from "react";

export default function ReviewCards () {

    const reviews = useAppSelector((state) => state.movieReviewsSlice)
    const config = useAppSelector((state) => state.configSlice)
    const user = useAppSelector((state) => state.userSlice)
    const dispacher = useAppDispatch()

    useEffect(() => {
        if(config.isLogged && user.likes){
            console.log("iside")
            for(let i = 0; i < reviews.length; i++){
                if(user.likes[i].review_id === reviews[i].id) {
                    console.log("like")
                    dispacher(likeTrue(i))
                }
            }
        }
    },[])


    const handleLike = (i: number) => {
        dispacher(giveLike(i))
        dispacher(checkLike(i))
        //---- dispacher gives a like to the review in the 
        if(!reviews[i].likeGiven){
            userLike(user.id,reviews[i].id)
        }
        else{
            userUnLike(user.id,reviews[i].id)
        }
        
    }

    const handleReportReview = (review_id: string) => {
        //---dispacher that creates a report for that review
    }

    return(
        <div>
            {reviews.map((r,i) => {

                return(
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
                )
            })}
        </div>
    )

}