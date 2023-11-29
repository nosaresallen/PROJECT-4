import { useState } from 'react';
import Login from './auth/Login';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';



function CreateAccount() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };




    return (
        
        // {/* <Box sx={{ minWidth: 275 }}>
        //     <Card variant="outlined">{card}</Card>
        // </Box> */}
            
        //     {/* {!showLogin && (
        //         <div>
        //             <h1>Employee Management Dashboard</h1>
        //             <p>Login to View</p>
        //             <button onClick={handleLoginClick}>LOGIN</button>
        //         </div>
        //     )}
        //     {showLogin && <Login />} */}

        <Container>
            {!showLogin && (
            <Box sx={{fontWeight: "bold",
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                
            <Typography variant="h2" gutterBottom  
            sx={{fontWeight: "bold"}}>
                Login to View Dashboard
            </Typography>
            <Button onClick={handleLoginClick} variant="contained">Login</Button>
                

            </Box>
            )} {showLogin && <Login />}
        </Container>
        
    );
}

export default CreateAccount

