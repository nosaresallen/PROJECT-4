// import { DataGrid } from '@mui/x-data-grid';
// import Typography from '@mui/material/Typography';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
//     ];

//     const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     ];

//     export default function EmployeeList() {
//     return (
        
//         <div style={{ height: 400, width: '100%' }}>
//             <Typography component="h1" variant="h3" sx={{fontWeight: "bold" }}>
//                     EMPLOYEE RECORDS
//                 </Typography>
            
//                 <hr />
//         <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//             pagination: {
//                 paginationModel: { page: 0, pageSize: 5 },
//             },
//             }}
//             pageSizeOptions={[5, 10]}
//             checkboxSelection
//         />
//         </div>
//     );
// }


import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';


import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import firebassApp from './firebaseConfig';
import { grey } from '@mui/material/colors';

const EmployeeList = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [filterText, setFilterText] = useState('');
    
        useEffect(() => {
        const db = getFirestore(firebassApp);
    
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
                const db = getFirestore(firebassApp);
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
    
        return (
            <div>
                <TextField
                    label="Search Employee"
                    variant="outlined"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{ marginBottom: '20px' }}
                />
                <TableContainer component={Paper} style={{ maxHeight: '300px' }}>
                <Table aria-label="employee table">
                <TableHead style={{ position: 'sticky', top: 0, background: grey[900], color: 'white', zIndex: 1 }}>
                    <TableRow >
                        <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Position</TableCell>
                        <TableCell>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {employeeList.length > 0 ? (
                    filteredEmployees.map((employee) => (
                        <TableRow key={employee.employee_id}>
                            <TableCell>{employee.firstname}</TableCell>
                            <TableCell>{employee.lastname}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            {/* <TableCell></TableCell> */}
                        <TableCell>
                            <IconButton
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
            </div>
            );
        };

export default EmployeeList;





