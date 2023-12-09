import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, teal } from '@mui/material/colors';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useState, useEffect } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });

    },[]);

    const handleLogin = () => {
        if (email !== '' && password !== '') {
            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/')
                })
                .catch((error) => {
                    alert('Error: ' + error.message);
                });
        } else {
            alert('Incorrect credentials')
        }

    }

    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //Validation of Email
    const [error, setError] = useState(false);

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        setError(!isValidEmail);
    };

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
                    <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                        Login
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                            error={error}
                            helperText={error ? 'Invalid email format' : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handlePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: grey[900],
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'teal'},
                                }}
                            onClick={() => handleLogin()}
                        > 
                            Login
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                            <Typography variant="body2" >
                                <RouterLink to='/register' style={{textDecoration: 'none', color: 'teal'}}>
                                {`Don't have an account? Register here.`}
                                </RouterLink>
                            </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login


