import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

import { Button } from '@mui/material';

import { PieChart } from '@mui/x-charts';


import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import firebassApp from './firebaseConfig';
import { grey, red } from '@mui/material/colors';

const EmployeeList = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [editableEmployee, setEditableEmployee] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const db = getFirestore(firebassApp);
    const [openModals, setOpenModals] = useState({});

    const handleCloseModal = (employeeID) => {
        // Update the state of the specific employee's modal to close
    setOpenModals((prevOpenModals) => ({
        ...prevOpenModals,
        [employeeID]: false,
    }));
    }
    
    useEffect(() => {
    
    
    try {
        const unsubscribe = onSnapshot(collection(db, 'employees'), (snapshot) => {
        const newEmployeeList = [];
        snapshot.forEach((employee) => {
            const tempEmployee = employee.data();
            tempEmployee['employee_id'] = employee.id;
            newEmployeeList.push(tempEmployee);
        });
        setEmployeeList(newEmployeeList);
        });

        return () => {
        // Unsubscribe from the snapshot listener when component unmounts
        unsubscribe();
        };
    } catch (e) {
        alert('Could not fetch employee data');
    }
    }, []);
    
    
    const deleteEmployee = async (employeeID) => {
        confirm(`Are you sure you want to delete`);
            try {
            await deleteDoc(doc(db, 'employees', employeeID));
            // Filter out the deleted employee from the state
            const updatedList = employeeList.filter((employee) => employee.employee_id !== employeeID);
            setEmployeeList(updatedList);
            
            } catch (error) {
            console.error('Error deleting document: ', error);
            }
        };

    const filteredEmployees = employeeList.filter((employee) => {
        const searchText = filterText.toLowerCase();
        const fullName = `${employee.firstname} ${employee.lastname}`.toLowerCase();
        const email = employee.email.toLowerCase();
        const position = employee.position.toLowerCase();
        
                
        return (
            fullName.startsWith(searchText) ||
            employee.firstname.toLowerCase().startsWith(searchText) ||
            employee.lastname.toLowerCase().startsWith(searchText) ||
            email.startsWith(searchText) ||
            position.startsWith(searchText)
            );
        });

        // Calculate position distribution for the pie chart
    const calculatePositionDistribution = () => {
        const positionsCount = {};
        employeeList.forEach((employee) => {
        const position = employee.position;
        if (positionsCount[position]) {
            positionsCount[position]++;
        } else {
            positionsCount[position] = 1;
        }
        });
        return positionsCount;
    };

        // Prepare data for the pie chart
    const positionsCount = calculatePositionDistribution();
    const pieChartData = Object.keys(positionsCount).map((position) => ({
        id: position,
        value: positionsCount[position],
        label: position,
    }));

    const handleCardEmployee = (employeeID) => {
        setOpenModals((prevOpenModals) => ({
            ...prevOpenModals,
            [employeeID]: true,
        }));
        // Fetch the specific employee data when the modal is opened for editing
        const selectedEmployee = employeeList.find((employee) => employee.employee_id === employeeID);
        setEditableEmployee(selectedEmployee);
        setIsEditMode(false); // Reset to view mode initially
    };

    const handleEditEmployee = () => {
        setIsEditMode(true); // Enable edit mode when "Edit" button is clicked
    };

    const handleSaveEmployee = async () => {
        if (editableEmployee) {
            try {
                // Update the employee data using Firebase's updateDoc
                const { employee_id, ...updatedEmployeeData } = editableEmployee;
                await updateDoc(doc(db, 'employees', employee_id), updatedEmployeeData);

                // Reset states after saving the changes
                setEditableEmployee(null);
                setIsEditMode(false);
                handleCloseModal(employee_id); // Close the modal after saving
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
    };

    
    return (
        <div>
            <PieChart
            series={[
                {
                data: pieChartData,
                },
            ]}
            width={800}
            height={250}
            />
            <TextField
                label="Search Employee"
                variant="outlined"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
                
            <TableContainer component={Paper} style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <Table aria-label="employee table">
            <TableHead style={{ position: 'sticky', top: 0, background: grey[900],  zIndex: 1 }}>
                <TableRow >
                    <TableCell style={{ color: 'white', width: '20%',fontWeight: 'bold', textAlign: 'center' }}>First Name</TableCell>
                    <TableCell style={{ color: 'white',width: '20%',fontWeight: 'bold', textAlign: 'center' }}>Last Name</TableCell>
                    <TableCell style={{ color: 'white',width: '20%',fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                    <TableCell style={{ color: 'white',width: '20%',fontWeight: 'bold', textAlign: 'center' }}>Position</TableCell>
                    <TableCell style={{ color: 'white',width: '20%',fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {employeeList.length > 0 ? (
                filteredEmployees.map((employee) => (
                    <TableRow key={employee.employee_id}>
                        <TableCell style={{ textAlign: 'center' }}>{employee.firstname}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{employee.lastname}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{employee.email}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{employee.position}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                    <IconButton  sx={{ color: grey[600] }}
                        aria-label="view"
                        onClick={() => handleCardEmployee(employee.employee_id)}
                        >
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton  sx={{ color: red[900] }}
                        aria-label="delete"
                        onClick={() => deleteEmployee(employee.employee_id)}
                        >
                        <DeleteIcon />
                    </IconButton>
                    </TableCell>
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={8}>No employees available</TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </TableContainer>
        {employeeList.length > 0 ? (
        filteredEmployees.map((employee) => (
        <Modal 
            key={employee.employee_id}
            open={openModals[employee.employee_id] || false}
            onClose={() => handleCloseModal(employee.employee_id)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        BackdropProps={{
                            sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                        }}
        >
            <Box  sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white',
                // border: '2px #000',
                borderRadius: '10px',
                boxShadow: 24,
                p: 4,
                }}>
                {editableEmployee && (
                                <div>
                                    {isEditMode ? (
                                        /* Display editable fields in edit mode */
                                        <div>
                                            
                                            <TextField
                                                label="First Name"
                                                value={editableEmployee.firstname}
                                                onChange={(e) => setEditableEmployee({ ...editableEmployee, firstname: e.target.value })}
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                            />
                                            
                                            <TextField
                                                label="Lastname"
                                                value={editableEmployee.lastname}
                                                onChange={(e) => setEditableEmployee({ ...editableEmployee, lastname: e.target.value })}
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                label="Address"
                                                value={editableEmployee.address}
                                                onChange={(e) => setEditableEmployee({ ...editableEmployee, address: e.target.value })}
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                label="Contact"
                                                value={editableEmployee.contact}
                                                onChange={(e) => setEditableEmployee({ ...editableEmployee, contact: e.target.value })}
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                label="Gender"
                                                value={editableEmployee.gender}
                                                onChange={(e) => setEditableEmployee({ ...editableEmployee, gender: e.target.value })}
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                label="Email"
                                                value={editableEmployee.email}
                                                onChange={(e) => setEditableEmployee({ ...editableEmployee, email: e.target.value })}
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                            />

                                            <Grid sx={{ mb: 2 }}>
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
                                                        label="Position"
                                                        onChange={(e) => setEditableEmployee({ ...editableEmployee, position: e.target.value })}
                                                        value={editableEmployee.position}
                                                                    
                                                    >
                                                        <MenuItem value={'Project Manager'}>Project Manager</MenuItem>
                                                        <MenuItem value={'Software Engineer'}>Software Engineer</MenuItem>
                                                        <MenuItem value={'UI/UX Designer'}>UI/UX Designer</MenuItem>
                                                        <MenuItem value={'Front End Developer'}>Front End Developer</MenuItem>
                                                        <MenuItem value={'Back End Developer'}>Back End Developer</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <TextField
                                                label="Hire Date"
                                                value={editableEmployee.hiredate}
                                                onChange={(e) => setEditableEmployee({ ...editableEmployee, hiredate: e.target.value })}
                                                variant="outlined"
                                                fullWidth
                                                type="date"
                                                sx={{ mb: 2 }}
                                            />
                                            

                                            
                                        </div>
                                    ) : (
                                        /* Display non-editable fields in view mode */
                                        <div>
                                            <Typography variant="h4" component="h4">
                                                <strong>Employee Information</strong> 
                                            </Typography>
                                            <hr />
                                            <Typography variant="body1">
                                                <strong>First name:</strong> {editableEmployee.firstname}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Last name:</strong> {editableEmployee.lastname}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Address:</strong> {editableEmployee.address}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Contact:</strong> {editableEmployee.contact}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Gender:</strong> {editableEmployee.gender}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Email:</strong> {editableEmployee.email}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Position:</strong> {editableEmployee.position}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Hire Date:</strong> {editableEmployee.hiredate}
                                            </Typography>
                                        </div>
                                    )}
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                        {isEditMode ? (
                                            /* Show Save button in edit mode */
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={handleSaveEmployee}
                                            >
                                                Save
                                            </Button>
                                        ) : (
                                            /* Show Edit button in view mode */
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleEditEmployee}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </Box>
                                </div>
                            )}
                        </Box>
                    </Modal>
                ))
            ) : (
                <Typography>No employees available</Typography>
            )}
        </div>
    );
};

export default EmployeeList;





