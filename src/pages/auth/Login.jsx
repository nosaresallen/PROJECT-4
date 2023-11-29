
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Login from './auth/Login';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import { Link as RouterLink, useNavigate} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useState} from 'react';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {

        if (email !== '' && password !== '' ){
            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate('/')
        })
        .catch((error) => {
            alert('error');
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        }else{
            alert('Incorrect credentials')
        }
        
    }

    const defaultTheme = createTheme();
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
            <Avatar sx={{ m: 1, bgcolor: grey[900], }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{fontWeight: "bold" }}>
                Login
            </Typography>

            <Box component="form"  noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                // autoComplete="email"
                // autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                // autoComplete="current-password"
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                /> */}
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: grey[900]}}
                onClick={()=>handleLogin()}
                >
                Login
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href='/register' variant="body2">
                    {"Don't have an account? Register here."}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            
        </Container>
        </ThemeProvider>
    )
}

export default Login
