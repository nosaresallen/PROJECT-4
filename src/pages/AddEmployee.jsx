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
import SampleDisplay from './SampleDisplay';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc,  doc } from "firebase/firestore";
import firebassApp from './firebaseConfig';
const defaultTheme = createTheme();

export default function SignUp() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //     email: data.get('email'),
    //     password: data.get('password'),
    //     });
    // };\
    
    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '', 
        address: '',
        contact: 0,
        gender: '',
        email: '',
        position: '',
        hiredate: '',
    });


    const [employeeList, setEmployeeList] = useState([]);

    useEffect(()=>{
        
        const db = getFirestore(firebassApp);
    
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
        
        const db = getFirestore(firebassApp);
        // if(employee.firstname === '' || employee.lastname === '' || employee.grade === '')
        setEmployeeList(
            employeeList => [
                ...employeeList, employee
            ]
        );

        addDoc(collection(db, 'employees'),employee);

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

        
    }
    // ======================================= DELETE DATA TO FIRESTORE=======================================
    
    const deleteEmployee = (employeeID) => {
        const db = getFirestore(firebassApp);
        const confirmation = window.confirm(`Are you sure you want to delete?`);
        if (confirmation) {
            deleteDoc(doc(db, 'employees', employeeID))
                .then(() => {
                    // Handle success or any other actions after deletion
                })
                .catch((error) => {
                    // Handle error if deletion fails
                    console.error("Error deleting document: ", error);
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

            {/* <p>
            {employee.firstname}
            {employee.lastname}
            {employee.address}
            {employee.contact}
            {employee.gender}
            {employee.email}
            {employee.position}
            {employee.hiredate}
            </p> */}
            
            {/* add onSubmit */}
            <Box component="form" noValidate  sx={{ mt: 3 }}> {/* onSubmit={handleSubmit} */}
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    variant='filled'
                    autoFocus
                    size="small"
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
                    variant='filled'
                    size="small"
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
                    variant='filled'
                    size="small"
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
                    variant='filled'
                    size="small"
                    onChange={(e)=>setEmployee({
                        ...employee,
                        contact: e.target.value
                    })}
                    value={employee.contact}
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
                    onChange={(e)=>setEmployee({
                        ...employee,
                        gender: e.target.value
                    })}
                    value={employee.gender}
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
                    onChange={(e)=>setEmployee({
                        ...employee,
                        email: e.target.value
                    })}
                    value={employee.email}
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
                    onChange={(e)=>setEmployee({
                        ...employee,
                        position: e.target.value
                    })}
                    value={employee.position}
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
                sx={{ mt: 3, mb: 2, bgcolor: grey[900] }}
                onClick={()=>addEmployee()}
                >
                Add employee
                </Button>
                {
                    employeeList.map((employeeRecord)=>(
                        <SampleDisplay
                            key={employeeRecord.id}
                            firstname = {employeeRecord.firstname}
                            lastname = {employeeRecord.lastname}
                            address = {employeeRecord.address}
                            contact = {employeeRecord.contact}
                            gender = {employeeRecord.gender}
                            email = {employeeRecord.email}
                            position = {employeeRecord.position}
                            hiredate = {employeeRecord.hiredate}
                            deleteEmployee = {deleteEmployee}
                            employeeID={employeeRecord.employee_id}
                        />
                    ))
                }
                
            </Box>
            </Box>

        </Container>
        </ThemeProvider>
    );
}