import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const ResetPassword = ({ cancel, confirm }) => {

    const [data, setData] = useState({ password: "", conPassword: "" });
    const [errors, setErrors] = useState({ password: "", conPassword: "" })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const validate = (fieldValues = data) => {
        let temp = { ...errors };

        if ("password" in fieldValues) temp.password = fieldValues?.password?.trim() === "" ? "Please enter Password" :
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
        if (validate())
            confirm(data?.password)
    }

    return (
        <>
            <Modal
                open={true}
                onClose={cancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5">Profile</Typography>
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                        name="password"
                        required
                        value={data?.passsword}
                        onChange={handleChange}
                    />
                    <Typography sx={{ color: "red" }}>{errors?.password}</Typography>
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                        required
                        name="conPassword"
                        value={data?.conPassword}
                        onChange={handleChange}
                    />
                    <Typography sx={{ color: "red" }}>{errors?.conPassword}</Typography>
                    <Box display="flex">
                        <Button sx={{ m: 2 }} variant="contained" color="error" onClick={cancel} fullWidth>Cancel</Button>
                        <Button sx={{ m: 2 }} variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ResetPassword