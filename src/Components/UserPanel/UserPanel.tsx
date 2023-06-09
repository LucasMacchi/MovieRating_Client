import {Box, Button, Typography, Tab, Tabs} from "@mui/material"
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../Store/hooks"
export default function UserPanel () {

    
    //const userGlobal = useAppSelector(state => state.userSlice)
    const userGlobal = {
        email: "lucasmacchi25@gmail.com",
        username: "Maki",
        dateBirth: "25-06-2001"
    }

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

    const shower = () => {
        //THIS RETURNS THE PANEL WITH THE USER INFORMATION
        if(info.info){
            return(
                <Box marginLeft="15px" >
                    <Typography marginTop="30px" variant="h4" color="white">{"Email: "+userGlobal.email}</Typography>
                    <Typography marginTop="30px" variant="h4" color="white">{"Username: "+userGlobal.username}</Typography>
                    <Typography marginTop="30px" variant="h4" color="white">{"Date of Birth: "+userGlobal.dateBirth}</Typography>
                    
                </Box>
            )
        }
        //---------------------------------------------------------------------------------//
        //THIS RETURNS THE PANEL WITH THE USER LIKES
        if(info.likes){
            return(
                <h1>LIKES</h1>
            )
        }
        //---------------------------------------------------------------------------------//
        //THIS RETURNS THE PANEL WITH THE USER REVIEWS
        if(info.reviews){
            return(
                <h1>REVIEWS</h1>
            )
        }
        //---------------------------------------------------------------------------------//
    }

    return(
        <div>
            <Box height="100vh" sx={{width: 1000, background: "#271f1f"}} >
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