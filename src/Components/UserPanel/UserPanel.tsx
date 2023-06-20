import {Box, Button, Typography, Tab, Tabs, Fab, Card, CardContent, Rating, IconButton, Alert, Backdrop} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
import { createTokenSendLink, changeUsername } from "../../Store/userSlice";
export default function UserPanel () {   
    //const userGlobal = useAppSelector(state => state.userSlice)
    const reviews = [
        {
            id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
            rating: 5,
            comment: 'god',
            likes: 80,
            movieId: '82b7cebe-fe7c-36ec-899e-28ea541f3a50',
            profileId: 'eb599068-b7f4-4ead-b27f-3da590643939',
            profileUser: 'Tobi',
            createdAt: '2023-06-12T12:35:37.925Z',
            updatedAt: '2023-06-12T13:06:38.025Z',
            likeGiven: true
        },
        {
            id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
            rating: 5,
            comment: 'god',
            likes: 80,
            movieId: '82b7cebe-fe7c-36ec-899e-28ea541f3a50',
            profileId: 'eb599068-b7f4-4ead-b27f-3da590643939',
            profileUser: 'Tobi',
            createdAt: '2023-06-12T12:35:37.925Z',
            updatedAt: '2023-06-12T13:06:38.025Z',
            likeGiven: true
        },
        {
            id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
            rating: 5,
            comment: 'god',
            likes: 80,
            movieId: '82b7cebe-fe7c-36ec-899e-28ea541f3a50',
            profileId: 'eb599068-b7f4-4ead-b27f-3da590643939',
            profileUser: 'Tobi',
            createdAt: '2023-06-12T12:35:37.925Z',
            updatedAt: '2023-06-12T13:06:38.025Z',
            likeGiven: true
        }
    ]
    const userGlobal = {
        email: "lucasmacchi25@gmail.com",
        username: "Maki",
        dateBirth: "25-06-2001",
        likes: [
            {
              id: '5862df4e-128f-49bf-aaac-961df6b7a2fc',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: '0360d345-e6bb-48b3-91a2-13227bcc7d60',
              createdAt: '2023-06-12T13:06:36.495Z'
            },
            {
              id: '7fd27d0b-4520-47c0-ad4a-bd52c4eaeda4',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: 'f4eaca35-dcea-4839-8ea6-1f779fd9c76c',
              createdAt: '2023-06-12T13:06:37.163Z'
            },
            {
              id: 'f892f026-889d-41e1-8d85-797f9bbb3822',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
              createdAt: '2023-06-12T13:06:38.028Z'
            },
            {
              id: 'e85b0455-7f1a-49d2-b467-1c88ffa38552',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: '31fd18e4-6c22-4511-95e2-0616c7c6b474',
              createdAt: '2023-06-12T13:06:39.154Z'
            },
            {
              id: '1b55f8ce-aa2e-46f0-8a3f-e32aa5ab3d6e',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: '9862142d-490f-42c2-97a1-1d8850162ff6',
              createdAt: '2023-06-12T13:06:39.923Z'
            },
            {
              id: '8dcb83a3-b593-4bee-b121-978c797170b7',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: 'aad8e5c6-6ae7-42c4-8749-f202aacac6b2',
              createdAt: '2023-06-12T13:06:40.987Z'
            },
            {
              id: '5a2705e3-d355-4ffc-bbb7-3177b2b20a60',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: '677819e4-8b38-4463-8f61-12faaf41f346',
              createdAt: '2023-06-12T13:06:41.636Z'
            },
            {
              id: '5e0d956a-1823-4686-bf6b-f38887af9471',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: '2ac6507b-6156-4559-88ed-f5bc6b76318d',
              createdAt: '2023-06-12T13:06:42.515Z'
            },
            {
              id: 'ef8e89cc-859a-4904-8fb0-762f44fe4dc7',
              user_id: '42dd0f1f-6e74-4621-912b-50a5c82ad215',
              review_id: '9d9d26cf-ec24-4fd4-a7d4-95597aff52d2',
              createdAt: '2023-06-12T13:06:53.650Z'
            }
        ],
        reviews: [
            {
                id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
                rating: 5,
                comment: 'god',
                likes: 80,
                movieId: '82b7cebe-fe7c-36ec-899e-28ea541f3a50',
                profileId: 'eb599068-b7f4-4ead-b27f-3da590643939',
                profileUser: 'Tobi',
                createdAt: '2023-06-12T12:35:37.925Z',
                updatedAt: '2023-06-12T13:06:38.025Z'
              },
              {
                id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
                rating: 5,
                comment: 'god',
                likes: 80,
                movieId: '82b7cebe-fe7c-36ec-899e-28ea541f3a50',
                profileId: 'eb599068-b7f4-4ead-b27f-3da590643939',
                profileUser: 'Tobi',
                createdAt: '2023-06-12T12:35:37.925Z',
                updatedAt: '2023-06-12T13:06:38.025Z'
              },
              {
                id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
                rating: 5,
                comment: 'god',
                likes: 80,
                movieId: '82b7cebe-fe7c-36ec-899e-28ea541f3a50',
                profileId: 'eb599068-b7f4-4ead-b27f-3da590643939',
                profileUser: 'Tobi',
                createdAt: '2023-06-12T12:35:37.925Z',
                updatedAt: '2023-06-12T13:06:38.025Z'
              },
              {
                id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
                rating: 5,
                comment: 'god',
                likes: 80,
                movieId: '82b7cebe-fe7c-36ec-899e-28ea541f3a50',
                profileId: 'eb599068-b7f4-4ead-b27f-3da590643939',
                profileUser: 'Tobi',
                createdAt: '2023-06-12T12:35:37.925Z',
                updatedAt: '2023-06-12T13:06:38.025Z'
              },
              {
                id: 'c08bc18a-4121-4712-9a26-3b5fb8b1eb59',
                rating: 5,
                comment: 'god',
                likes: 80,
                movieId: '82b7cebe-fe7c-36ec-899e-28ea541f3a50',
                profileId: 'eb599068-b7f4-4ead-b27f-3da590643939',
                profileUser: 'Tobi',
                createdAt: '2023-06-12T12:35:37.925Z',
                updatedAt: '2023-06-12T13:06:38.025Z'
              }
        ]
    }

    const [backdrop, setBackdrop] = useState(false)
    const [usernameChange, setUsernameChange] = useState("")
    const [statusPasswordReset, setStatusPassword] = useState(0)
    const [statusUserChange, setStatusUser] = useState(0)
    const [tabValue, setTabValue] = useState(0)
    const [info, setInfo] = useState({
        info: true,
        reviews: false,
        likes: false
    })

    const handleChangeTab = (event: React.SyntheticEvent, v: number) => {
        setTabValue(v);
        switch(v){
            case 0: {setInfo({info: true, reviews: false, likes: false}); break;}
            case 1: {setInfo({info: false, reviews: true, likes: false}); break;}
            case 2: {setInfo({info: false, reviews: false, likes: true}); break;}
        }
    }

    const handlePasswordChange = async () => {
        try {
            const res = await createTokenSendLink(userGlobal.email)
            setStatusPassword(1)
        } catch (error) {
            setStatusPassword(2)
        }
        setTimeout(() => {
            setStatusPassword(0)
        }, 5000);
    }
    /*
    const handleUsernameChange = async () => {
        try {
            
            setStatusUser(1)
        } catch (error) {
            setStatusUser(2)
        }
        setTimeout(() => {
            setStatusUser(0)
        }, 5000);
    }
    */
    const handleUsernameChange = async () => {
        
        
    }
    const usernameShower = () => {
        
    }
    const statusShowerPass = () => {
        if(statusPasswordReset === 1){
            return(<Alert variant="filled" severity="success">Link for password change sent!</Alert>)
        }
        else if(statusPasswordReset === 2){
            return(<Alert variant="filled" severity="error">Error while trying to sent the link</Alert>)
        }
    }
    /*
    const statusShowerUser = () => {
        if(statusPasswordReset === 1){
            return(<Alert variant="filled" severity="success">Link for password change sent!</Alert>)
        }
        else if(statusPasswordReset === 2){
            return(<Alert variant="filled" severity="error">Error while trying to sent the link</Alert>)
        }
    }
    */
    const shower = () => {
        //THIS RETURNS THE PANEL WITH THE USER INFORMATION
        if(info.info){
            //GIVE FUNTIONALITY TO THE EDIT BUTTONS****
            return(
                <Box marginLeft="15px" >
                    
                    <Typography marginTop="30px" variant="h4" color="white">{"Email: "+userGlobal.email}</Typography>
                    <Box sx={{display: "flex"}}>
                        <Typography marginTop="30px" variant="h4" color="white">{"Username: "+userGlobal.username}</Typography>
                        <Fab sx={{marginLeft: 6, marginTop: 2.5}} onClick={handleUsernameChange}><EditIcon/></Fab>
                    </Box>
                    <Typography marginTop="30px" variant="h4" color="white">{"Date of Birth: "+userGlobal.dateBirth}</Typography>
                    <Box sx={{display: "flex"}}>
                        <Typography marginTop="30px" variant="h4" color="white">{"Password: *********"}</Typography>
                        <Fab sx={{marginLeft: 6, marginTop: 2.5}} onClick={handlePasswordChange}><EditIcon/></Fab>
                    </Box>
                    { statusShowerPass()}
                </Box>
            )
        }
        //---------------------------------------------------------------------------------//
        //THIS RETURNS THE PANEL WITH THE USER LIKES
        if(info.likes){
            // GIVE FUNCTIONALITY TO THE LIKE BUTTON****
            return(
                reviews.map((r,i) => {
                    return(
                        <Box sx={{marginTop: 5, marginBottom: 5}}>
                            <Card variant="outlined" sx={{width:700 ,minheight: 100,maxHeight:300, m: 5, borderRadius: 10}} key={i}>
                            <CardContent>
                                
                                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                                    <Rating name="reviewRating" value={r.rating} readOnly/>
                                </Box>
                                <Typography gutterBottom variant="h6" component="div" color="white">
                                    {r.profileUser}
                                </Typography>
                                <Typography variant="body2" color="white" gutterBottom style={{wordWrap: "break-word"}}>
                                    {r.comment}
                                </Typography>
                                <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                                <IconButton color={r.likeGiven ? "primary" : "default"}>
                                    <ThumbUpAltIcon/>
                                    {r.likes}
                                </IconButton>
                            </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )}))
                
        }
        //---------------------------------------------------------------------------------//
        //THIS RETURNS THE PANEL WITH THE USER REVIEWS
        if(info.reviews){
            //GIVE FUNCTIONALITY TO THE BUTTONS EDIT AND DELETE*****
            return(
                userGlobal.reviews.map((r, i) => {
                    return(
                        <Box sx={{marginTop: 5, marginBottom: 5}}>
                            <Card variant="outlined" sx={{width:700 ,minheight: 100,maxHeight:300, m: 5, borderRadius: 10}} key={i}>
                            <CardContent>
                            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                                <Rating name="reviewRating" value={r.rating} readOnly/>
                            </Box>
                            <Typography gutterBottom variant="h6" component="div" color="white">
                                {r.profileUser}
                            </Typography>
                            <Typography variant="body2" color="white" gutterBottom style={{wordWrap: "break-word"}}>
                                {r.comment}
                            </Typography>
                            <Box sx={{marginTop: 5, display: "flex", justifyContent: "space-evenly"}}>
                                <Box sx={{display: "flex"}}>
                                    <ThumbUpAltIcon sx={{marginTop: 0.5, marginRight: 0.5}}/>
                                    <Typography color={"white"} variant="h6">{r.likes}</Typography>
                                </Box>
                                <Button variant="contained" color="secondary" endIcon={<EditIcon/>}>Edit</Button>
                                <Button variant="contained" color="error" endIcon={<DeleteIcon/>} >Delete</Button>
                            </Box>
                        </CardContent>
                            </Card>
                        </Box>
                    )
                })
            )

        }
        //---------------------------------------------------------------------------------//
    }


    return(
        <div>
            <Box sx={{width: 800, minHeight: "100vh", maxHeight: "100%", background: "#271f1f"}} >
                <Typography variant="h2" color="white" marginLeft="15px">User Settings</Typography>
                <Tabs value={tabValue} variant="fullWidth" onChange={handleChangeTab} >
                    <Tab label="User Information" />
                    <Tab label="User Reviews" />
                    <Tab label="User Likes" />
                </Tabs>
                {shower()}
            </Box>
        </div>
    )
}