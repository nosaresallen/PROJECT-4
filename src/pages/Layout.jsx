import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Tooltip from '@mui/material/Tooltip';
import { grey } from '@mui/material/colors';

import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";
import { useState, useEffect } from 'react';
import firebaseApp from "./firebaseConfig";
import DateAndTime from './DateAndTime';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    });

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    });

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    }));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
    );

function Layout() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [userProfile, setUserProfile] = useState('');
    const auth = getAuth(firebaseApp);
    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setUserProfile({
                    email: user.email,
                    name: user.displayName
                    
                })
            } else {
                navigate('/login');
            }
        });

    },[]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth)
            .then(() => {
                confirm('Are you sure you want to logout?');
                navigate('/login');
            })
            .catch((error) => {
                console.log('Error during logout:', error);
            });
        
    };

    return (
        <Box sx={{ display: 'flex' }} >
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ bgcolor: grey[900] }}>
            <Toolbar  >
            <IconButton 
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div" >
                EMPLOYEE MANAGEMENT DASHBOARD
            </Typography>
            
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{'& .MuiDrawer-paper': {backgroundColor: '#212121', },}}>
            <DrawerHeader >
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{color: '#f5f5f5'}}/>}
            </IconButton>
            </DrawerHeader>
            <Divider />
            
            
            <Divider />
            <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} >
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <RouterLink to="/" style={{ textDecoration: 'none' }}> 
                        <ListItemButton 
                            sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            '&:hover': {
                                textDecoration: 'none',
                                color: 'black',
                            },
                            '&:active': {
                                textDecoration: 'none',
                                color: 'black', 
                            },
                            }}
                        >
                        <Tooltip title='Dashboard' placement='right'>
                            <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: '#f5f5f5',
                            }}
                            >
                            { <DashboardIcon />}
                            </ListItemIcon>
                        </Tooltip>

                            <ListItemText  primary={['Dashboard']} sx={{ opacity: open ? 1 : 0, color: '#f5f5f5'}} />
                        </ListItemButton>
                    </RouterLink>
                    <RouterLink to="/addemployee" style={{ textDecoration: 'none' }}> 
                        <ListItemButton 
                            sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            '&:hover': {
                                textDecoration: 'none',
                                color: 'black',
                            },
                            '&:active': {
                                textDecoration: 'none',
                                color: 'black',
                            },
                            }}
                        >
                        <Tooltip title='Add Employee' placement='right'>
                            <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: '#f5f5f5',
                            }}
                            >
                            { <PersonAddAltIcon />}
                            </ListItemIcon>
                        </Tooltip>

                            <ListItemText  primary={['Add Employee']} sx={{ opacity: open ? 1 : 0, color: '#f5f5f5' }} />
                        </ListItemButton>

                        
                    </RouterLink>
                    <Divider sx={{color: '#f5f5f5'}} />
                    <RouterLink onClick={handleLogout} style={{ textDecoration: 'none' }}> 
                        <ListItemButton 
                            sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            '&:hover': {
                                textDecoration: 'none',
                                color: 'black',
                            },
                            '&:active': {
                                textDecoration: 'none',
                                color: 'black',
                            },
                            }}
                        >
                            <Tooltip title='Logout' placement='right'>
                                <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#f5f5f5',
                                }}
                                >
                                { <LogoutIcon />}
                                </ListItemIcon>
                            </Tooltip>

                            <ListItemText  primary={['Logout']} sx={{ opacity: open ? 1 : 0, color: '#f5f5f5' }} />
                        </ListItemButton>
                    </RouterLink>

                </ListItem>
            </List>
            
            <Divider />

    <Typography variant="body2" align="center" sx={{ opacity: open ? 1 : 0, py: 2, bgcolor: '#212121', color: '#f5f5f5' }}>
        <Typography>
            Hello, {userProfile.name}! 👋🏻  
            </Typography>
        <DateAndTime />
        <hr />
        Developed by <strong>Allen</strong> @ <strong>BASE-404</strong>
    </Typography>
        </Drawer>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <section>
                <Outlet sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
            }}></Outlet>

            
            
            </section>
        </Box>
        </Box>

    )
}

export default Layout