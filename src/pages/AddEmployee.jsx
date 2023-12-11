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
import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getFirestore, collection, onSnapshot, addDoc} from "firebase/firestore";
import firebassApp from './firebaseConfig';
const defaultTheme = createTheme();

export default function AddEmployee() {

    const db = getFirestore(firebassApp);
    const [employeeList, setEmployeeList] = useState([]);
    const [open, setOpen] = useState(false);

    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '', 
        address: '',
        contact: '',
        gender: '',
        email: '',
        position: '',
        hiredate: '',
    });

    //Validation of Email
    const [error, setError] = useState(false);

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        // Basic email validation
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

        setEmployee({ ...employee, email: emailValue });
        setError(!isValidEmail);
    };



    

    useEffect(()=>{
        try {
            onSnapshot(collection(db, 'employees'), snapshot => {
                const newEmployeeList = [];
                snapshot.forEach(employee => {
                    const tempEmployee = employee.data();
                    tempEmployee["employee_id"] = employee.id;
                    newEmployeeList.push(tempEmployee);

                });
                setEmployeeList( newEmployeeList)
                
            });
        }catch(e){
            alert('Could not fetch employee data');
        } 

    }, [])


    // ======================================= ADD DATA TO FIRESTORE=======================================
    const addEmployee = () => {
        if (
            employee.firstname !== '' &&
            employee.lastname !== '' &&
            employee.address !== '' &&
            employee.contact !== '' &&
            employee.gender !== '' &&
            employee.email !== '' &&
            employee.position !== '' &&
            employee.hiredate !== ''
        ) {
            addDoc(collection(db, 'employees'), employee)
                .then(() => {
                    setEmployeeList([...employeeList, employee]);
    
                    Swal.fire({
                        toast: true,
                        icon: "success",
                        title: "Added successfully",
                        showConfirmButton: false,
                        timer: 2500
                    });
    
                    setEmployee({
                        firstname: '',
                        lastname: '',
                        address: '',
                        contact: '',
                        gender: '',
                        email: '',
                        position: '',
                        hiredate: '',
                    });
                    setOpen(true);
                })
                .catch(() => {
                    Swal.fire({
                        toast: true,
                        title: "Registration Failed!",
                        text: "Please input correct credentials.",
                        icon: "error",
                        confirmButtonColor: "black"
                    });
                });
        } else {
            Swal.fire({
                toast: true,
                title: "Please fill out all the fields.",
                icon: "warning",
                confirmButtonColor: "black"
            });
        }
    };
    

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

            <Box component="form" noValidate  sx={{ mt: 3 }}> 
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    variant='outlined'
                    autoFocus
                    size="medium"
                    onChange={(e)=>setEmployee({
                        ...employee,
                        firstname: e.target.value
                    })}
                    value={employee.firstname}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    variant='outlined'
                    size="medium"
                    onChange={(e)=>setEmployee({
                        ...employee,
                        lastname: e.target.value
                    })}
                    value={employee.lastname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    variant='outlined'
                    size="medium"
                    onChange={(e)=>setEmployee({
                        ...employee,
                        address: e.target.value
                    })}
                    value={employee.address}
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
                    variant='outlined'
                    size="medium"
                    onChange={(e)=>setEmployee({
                        ...employee,
                        contact: e.target.value
                    })}
                    value={employee.contact}
                    inputProps={{
                        min: 0,
                    }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                <InputLabel id="gender">Gender*</InputLabel>
                    <Select
                    
                    required
                    fullWidth
                    name="gender"
                    type="gender"
                    labelId="gender"
                    id="gender"
                    variant='outlined'
                    size="medium"
                    label="Gender"
                    onChange={(e)=>setEmployee({
                        ...employee,
                        gender: e.target.value
                    })}
                    
                    value={employee.gender}
                    
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>

                
                
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth 
                    id="email"
                    label="Email"
                    name="email"
                    variant='outlined'
                    size="medium"
                    onChange={handleEmailChange}

                    value={employee.email}
                    error={error}
                    helperText={error ? 'Invalid email format' : ''}
                    InputProps={{
                    type: 'email',
                }}
                    />
                    
                </Grid>

                <Grid item xs={12}>
                <FormControl fullWidth >
                <InputLabel id="position">Position*</InputLabel>
                    <Select
                    
                    required
                    fullWidth
                    name="position"
                    
                    type="position"
                    labelId="position"
                    id="position"
                    variant='outlined'
                    size="medium"
                    label="Position"
                    onChange={(e)=>setEmployee({
                        ...employee,
                        position: e.target.value
                    })}
                    
                    value={employee.position}
                    
                    >
                        <MenuItem value={'Project Manager'}>Project Manager</MenuItem>
                        <MenuItem value={'Software Engineer'}>Software Engineer</MenuItem>
                        <MenuItem value={'UI/UX Designer'}>UI/UX Designer</MenuItem>
                        <MenuItem value={'Front End Developer'}>Front End Developer</MenuItem>
                        <MenuItem value={'Back End Developer'}>Back End Developer</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="hiredate"
                    label="Hire Date " 
                    type="date"
                    id="hiredate"
                    variant='outlined'
                    size="medium"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e)=>setEmployee({
                        ...employee,
                        hiredate: e.target.value
                    })}
                    value={employee.hiredate}
                    />
                    
                </Grid>
                
                </Grid>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: grey[900],
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: 'teal'}, }}
                
                onClick={()=>addEmployee()}
                >
                Add employee
                </Button>
            </Box>
            </Box>

        </Container>
        </ThemeProvider>
    );
}