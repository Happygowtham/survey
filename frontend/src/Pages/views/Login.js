import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axiosInstance from "../../axiosInstance";
import { Alert, Snackbar } from '@mui/material';


const Login = () => {

    const navigate = useNavigate()
    const [data, setData] = useState({ username: "", password: "" })
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        axiosInstance('/token', {
            method: "post",
            data: data
        }).then(res => {
            localStorage?.setItem("survey_management_token", JSON.stringify(res.data?.user))
            navigate("/form")
        }).catch(err => {
            console.log('err: ', err);
            setAlert({ show: true, message: err?.response?.data?.detail, type: "error" })
        })
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={alert?.show}
                autoHideDuration={3000}
            >
                <Alert onClose={() => { setAlert({ show: false, message: "", type: "" }) }} severity={alert?.type}>{alert?.message}</Alert>
            </Snackbar>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            value={data.username}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Login