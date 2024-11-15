import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Alert, FormControl, FormHelperText, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { isValidEmail } from '../../helper/BaseFunction';

const Register = () => {

    const navigate = useNavigate()
    const initValue = {
        name: "",
        email: "",
        password: "",
        conPassword: "",
        role: "user"
    }
    const [data, setData] = useState(initValue)
    const [errors, setErrors] = useState({ ...initValue, role: "" })
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const validate = (fieldValues = data) => {
        let temp = { ...errors };

        if ("name" in fieldValues) {
            temp.name = fieldValues.name?.trim() === "" ? "Full Name is required" : '';
        } if ("email" in fieldValues) {
            temp.email = fieldValues.email?.trim() === "" ? "Email is required" : isValidEmail(fieldValues?.email) ? "" : "Please enter valid Email";
        } if ("password" in fieldValues) temp.password = fieldValues?.password?.trim() === "" ? "Please enter Password" :
            fieldValues?.password?.trim()?.length < 8 ? "Password must be between 8 to 16 characters" :
                (!/[a-z]/.test(fieldValues?.password?.trim()) ||
                    !/[A-Z]/.test(fieldValues?.password?.trim()) ||
                    !/[0-9]/.test(fieldValues?.password?.trim()) ||
                    !/[^a-zA-Z0-9]/.test(fieldValues?.password?.trim()) ||
                    !/[_!@#$%^&*]/.test(fieldValues?.password?.trim())) ? "Password should include Numbers, Symbols, and Uppercase and Lowercase Letters"
                    : "";
        if ("conPassword" in fieldValues) temp.conPassword = fieldValues?.conPassword === "" ? "Please enter Confirm Password" :
            fieldValues?.password !== fieldValues?.conPassword ? "Confirm Password must match with password" : "";

        setErrors({ ...temp });

        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = () => {
        if (validate()) {
            axiosInstance('user/register/', {
                method: "post",
                data: data
            }).then(res => {
                setAlert({ show: true, message: res?.message, type: "success" })
                setData(initValue)
                setTimeout(() => { navigate("/") }, 3000)
            }).catch(err => {
                setAlert({ show: true, message: err.response.data.message, type: "error" })
            })
        }
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
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://source.unsplash.com/random)',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
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
                            <FormControl fullWidth>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={handleChange}
                                    value={data.name}
                                    size="small"
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors.name}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    size="small"
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors.email}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    value={data.password}
                                    size="small"
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors.password}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="conPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="conpassword"
                                    autoComplete="current-con-password"
                                    onChange={handleChange}
                                    value={data.conPassword}
                                    size="small"
                                />
                                <FormHelperText sx={{ color: 'red' }}>{errors.conPassword}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-label" size="small">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={data?.role || ""}
                                    label="Role"
                                    onChange={handleChange}
                                    size="small"
                                    name="role"
                                >
                                    <MenuItem value={"user"}>User</MenuItem>
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/" variant="body2">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Register