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

import { PieChart } from '@mui/x-charts';


import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import firebassApp from './firebaseConfig';
import { green, grey, red } from '@mui/material/colors';

const EmployeeList = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [filterText, setFilterText] = useState('');
    const db = getFirestore(firebassApp);

    // Inside your functional component (EmployeeList)
    const [openModals, setOpenModals] = useState({});

    const handleCardEmployee = (employeeID) => {
        // Update the state of the specific employee's modal to open
        setOpenModals((prevOpenModals) => ({
        ...prevOpenModals,
        [employeeID]: true,
    }));
    }

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

    // const handleCardEmployee = (employeeID) => {
    //     alert('View me');
        
    // }

    
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
            <TableHead style={{ position: 'sticky', top: 0, background: grey[500], color: 'white', zIndex: 1 }}>
                <TableRow >
                    <TableCell style={{ width: '20%',fontWeight: 'bold', textAlign: 'center' }}>First Name</TableCell>
                    <TableCell style={{ width: '20%',fontWeight: 'bold', textAlign: 'center' }}>Last Name</TableCell>
                    <TableCell style={{ width: '20%',fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                    <TableCell style={{ width: '20%',fontWeight: 'bold', textAlign: 'center' }}>Position</TableCell>
                    <TableCell style={{ width: '20%',fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
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
                        {/* <TableCell></TableCell> */}
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
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                }}>
                {/* Content of your modal */}
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Employee Details
                </Typography>
                <hr />
                <Typography variant="body1">
                    First name: {employee.firstname}
                </Typography>
                <Typography variant="body1">
                    Last name: {employee.lastname}
                </Typography>
                <Typography variant="body1">
                    Address: {employee.address}
                </Typography>
                <Typography variant="body1">
                    Contact: {employee.contact}
                </Typography>
                <Typography variant="body1">
                    Gender: {employee.gender}
                </Typography>
                <Typography variant="body1">
                    Email: {employee.email}
                </Typography>
                <Typography variant="body1">
                    Position: {employee.position}
                </Typography>
                <Typography variant="body1">
                    Hire Date: {employee.hiredate}
                </Typography>
                <button>
                    Edit
                </button>
                <button>
                    Save
                </button>
            </Box>
        </Modal>
        ))
        ) : (
            <Typography >
                    No employees available
            </Typography>
        )}
        </div>
        );
    };

export default EmployeeList;





