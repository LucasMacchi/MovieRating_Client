import { Card, CardContent, Rating, Typography, CircularProgress ,Box, TextField, Button, Alert } from "@mui/material"
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import {useState, useEffect} from "react"
import { postReview, getUserInfoFromSession } from "../../Store/userSlice";
import { useCookies } from "react-cookie";

export default function ReviewMaker(){

    const [cookies] = useCookies()
    const user = useAppSelector((state) => state.userSlice)
    const config = useAppSelector((state) => state.configSlice)
    const movie = useAppSelector((state) => state.detailSlice)
    const dispacher = useAppDispatch()
    const [review, setReview] = useState({
        ratingValue: 1,
        comment: ""
    })
    const [loading, setLoading] = useState(false)
    const [canReview, setCanReview] = useState(true) 

    const limit = 300

    const [commentError, setCommentError] = useState(false)

    useEffect(() => {
        if(cookies.session_id){
            const session_id = cookies.session_id
            dispacher(getUserInfoFromSession(session_id))
            reviewChecker()
        }
    },[])

    const reviewChecker = async () => {
        user.reviews.forEach(r => {
            if(r.movieId === movie.id){
                setCanReview(false)
            }
        });
    }

    useEffect(() => {
        if(review.comment.length > limit) setCommentError(true)
        else  setCommentError(false)
        if(review.ratingValue === 0) setReview({...review, ratingValue: 1})
    },[review])

    const handleReview = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const response = await postReview(user.id,movie.id,review.comment, review.ratingValue)
        setLoading(false)
        if(response){
            setTimeout(() => {
                setCanReview(false)
            }, 1000);

            <Alert variant="filled" severity="success">Review Posted</Alert>
        }
        else{
            <Alert variant="filled" severity="error">Error while posting the review</Alert>
        }

    }   

    const loginChecker = () => {
        if(config.isLogged && canReview){
            return(
                <CardContent>
                <Typography variant="h6" color="#FFFFFF">Make your Review!</Typography>
                <Box component="form" onSubmit={(e) => handleReview(e)}>
                    <Box>
                        <Rating value={review.ratingValue} onChange={(e, v) => {setReview({...review, ratingValue: v ? v : 0})}}/>
                    </Box>
                    <Box>
                        <TextField 
                        value={review.comment} label="Comment" multiline fullWidth rows={3} 
                        error={commentError}
                        helperText={review.comment.length+"/"+limit}
                        onChange={(e) => setReview({...review, comment: e.target.value})}
                        />
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        {loading ? 
                        <CircularProgress/>
                        :
                        <Button disabled={commentError} type="submit" color="secondary" variant="contained" endIcon={<ReviewsIcon/>}>Review it!</Button>
                        }
                        
                    </Box>
    
                </Box>
            </CardContent>
            )
        }
        else{
            if(!canReview){
                return(
                    <Box display={"flex"} justifyContent={"center"}>
                        <Typography variant="h6" color="#FFFFFF">Movie Already reviewed</Typography>
                    </Box>
                )
            }
            return (
                <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="h6" color="#FFFFFF">Login to Review the Movie</Typography>
                </Box>
            )
        }
    }

    return(
        <div>
            <Card sx={{width:700 ,maxheight:500, m: 5, borderRadius: 10}}>
                {loginChecker()}
            </Card>
        </div>
    )
}