import {Box, Button, Typography} from "@mui/material"

export default function UserPanel () {
    return(
        <div>
            <Box height="100vh" sx={{width: 600, background: "#271f1f"}} >
                <Typography variant="h2" color="white" marginLeft="15px">User Settings</Typography>
            </Box>
        </div>
    )
}