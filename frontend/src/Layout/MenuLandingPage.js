import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupIcon from '@mui/icons-material/Group';
import ResetPassword from "./ResetPassword";
import axiosInstance from '../axiosInstance';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const MenuLandingPage = ({ children }) => {
    const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [showPasswod, setShowPassword] = useState(false);
    const user = JSON.parse(localStorage?.getItem("task_management_user"));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Routes = [
        { title: 'Tasks', route: "/task", icon: <AssignmentIcon />, show: true },
        { title: 'Projects', route: "/project", icon: <AccountTreeIcon />, show: user?.role === "admin" },
        { title: 'Users', route: "/user", icon: <GroupIcon />, show: user?.role === "admin" }
    ];

    const handleLogout = () => {
        localStorage.removeItem("task_management_token");
        navigate("/")
    }

    const handleChangePassword = () => {
        setShowPassword(true)
    }

    const handleSubmitPassword = (data) => {
        setShowPassword(false);
        axiosInstance("/user/changePassword", {
            method: "POST",
            data: {
                id: user?._id,
                newPassword: data
            }
        }).then(res => {
            localStorage.removeItem("task_management_token");
            localStorage.removeItem("task_management_user");
            navigate("/")
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            {
                showPasswod &&
                <ResetPassword cancel={() => setShowPassword(false)} confirm={handleSubmitPassword} />
            }
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        {
                            !open &&
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleDrawerOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                        }

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Task Management
                        </Typography>
                        <Button color="inherit" onClick={() => handleChangePassword()}>Change Password</Button>
                        <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {Routes.map((res, index) => (
                            res?.show &&
                            <Link key={index} to={res?.route} style={{ textDecoration: 'none', color: "black" }}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {res?.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={res?.title} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {children}
                </Main>
            </Box>
        </>
    );
}

export default MenuLandingPage