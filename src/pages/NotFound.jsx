import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';


export default function NotFound() {
    useEffect(() => {
        // Apply background color to the body
        document.body.style.backgroundColor = 'black';
    
        // Clean up the style when the component unmounts
        return () => {
            document.body.style.backgroundColor = '';
            };
        }, []);
    return (
        <Container>
            <Typography variant="h1" sx={{color:"white",width: '100%',
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        alignItems: 'center'}} >
                {`404`}
            </Typography>
            <SatelliteAltIcon sx={{color:"white",
                        width: '100%',
                        fontSize: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}/>
            <Typography variant="h2"  component="div" sx={{color:"white",width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        alignItems: 'center'}} >
                {`Look like you're lost`}
            </Typography>
            <Typography variant="h6"   sx={{color:"white",width: '100%',
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}} >
                {`the page you are looking for not available`}
            </Typography>
            <Button  href='/login' sx={{color:"black",
                        backgroundColor: "white",
                        textAlign: 'center',
                        width: 100,
                        display: 'block', 
                        margin: '0 auto',
                        fontWeight: 'bold',
                        marginTop: 2,
                        transition: 'background-color 0.3s',
                        '&:hover': {
                            backgroundColor: 'teal',
                        },}}>
                Go Back
            </Button>
        </Container>
    );
}

