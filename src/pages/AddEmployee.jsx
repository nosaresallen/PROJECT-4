import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const defaultTheme = createTheme();

export default function SignUp() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //     email: data.get('email'),
    //     password: data.get('password'),
    //     });
    // };

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: grey[900] }}>
                <PersonAddAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{fontWeight: "bold" }}>
                Add Employee
            </Typography>
            
            {/* add onSubmit */}
            <Box component="form" noValidate  sx={{ mt: 3 }}> {/* onSubmit={handleSubmit} */}
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    variant='filled'
                    autoFocus
                    size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    variant='filled'
                    size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    variant='filled'
                    size="small"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    name="contact"
                    label="Contact"
                    type="number"
                    id="contact"
                    variant='filled'
                    size="small"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    variant='filled'
                    size="small"
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth 
                    id="email"
                    label="Email"
                    name="email"
                    variant='filled'
                    size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="position"
                    label="Position"
                    type="position"
                    id="position"
                    variant='filled'
                    size="small"
                    />
                </Grid>
                
                {/* <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="dateofbirth"
                    label=""
                    type="date"
                    id="dateofbirth"
                    />
                </Grid> */}
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="hiredate"
                    label="Hire Date " 
                    type="date"
                    id="hiredate"
                    variant='filled'
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </Grid>
                
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: grey[900] }}
                >
                Add employee
                </Button>
            </Box>
            </Box>

        </Container>
        </ThemeProvider>
    );
}