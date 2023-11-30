import { useState } from 'react';
import Login from './auth/Login';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';




function CreateAccount() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    return (
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

