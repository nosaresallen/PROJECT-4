
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Swal from 'sweetalert2';

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useState, useEffect } from 'react';

const defaultTheme = createTheme();

export default function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const auth = getAuth(firebaseApp);

    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });

    },[]);

    const handleRegister = () => {

        if (
            name !== '' && 
            email !== '' && 
            password !== '' && 
            confirmPassword !== '' && 
            password === confirmPassword 
            ){
            createUserWithEmailAndPassword(auth, email, password).then(
                (useCredentials) => {
                    const user = useCredentials.user;
                    updateProfile(auth.currentUser,{
                        displayName: name
                    })
                })
                .catch(() => {
                    Swal.fire({
                        title: "Registration Failed!",
                        text: "Please input correct credentials.",
                        icon: "error",
                        confirmButtonColor: "black"
                    });
                });
        }else{
            Swal.fire({
                title: "Registration Failed!",
                text: "Please fill out all the fields.",
                icon: "warning",
                confirmButtonColor: "black"
            });
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
                    id="name"
                    label="Name"
                    name="name"
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleEmailChange}
                    value={email}
                    error={error}
                    helperText={error ? 'Invalid email format' : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    onChange={(e)=>setPassword(e.target.value)}
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
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    value={confirmPassword}
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
                </Grid>
                </Grid>
                <Button
                fullWidth
                variant="contained"
                onClick={()=>handleRegister()}
                sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: grey[900],
                    transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'teal'},}}
                >
                Register
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Typography variant="body2" >
                        <RouterLink to='/login' style={{textDecoration: 'none', color: 'teal'}}>
                            Already have an account? Login here.
                        </RouterLink>
                    </Typography>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}