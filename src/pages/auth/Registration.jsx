
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import {useNavigate} from "react-router-dom";
import { useState } from 'react';

const defaultTheme = createTheme();

export default function Registration() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = () => {

        if (email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword ){
            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    alert('Registeration Successful');
                    navigate('/login')
                })
                .catch((error) => {
                    alert('Registeration Failed');
                    // ..
                });
        }else{
            alert('Incorrect credentials')
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: grey[900] }}>
                <AppRegistrationIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{fontWeight: "bold" }}>
                Register
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    id="confirmPassword"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    />
                </Grid>
                </Grid>
                <Button
                fullWidth
                variant="contained"
                onClick={()=>handleRegister()}
                sx={{ mt: 3, mb: 2, bgcolor: grey[900] }}
                >
                Register
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href='/login' variant="body2">
                    Already have an account? Login here.
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}