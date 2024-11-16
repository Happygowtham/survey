import { useEffect, useState } from "react"
import axiosInstance from "../../axiosInstance"
import Base from "../../Layout/Base";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const FormsLandingPage = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        axiosInstance('forms/', {
            method: "GET",
        }).then(res => {
            setData(res)
        }).catch(err => {

        })
        //eslint-disable-next-line
    }, [])

    const handleCreateNew = () => {
        axiosInstance('/forms/', {
            method: "POST",
            data: {
                "form": data?.[0]?.id,
            }
        }).then(res => {
            navigate(`/add-form/${res?.id}`)
        }).catch(err => {
            console.log('err: ', err);
        })
    }

    const hanldeViewResponse = () => {
        navigate(`/responses`)
    }

    return (
        <Base>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">Survey Forms</Typography>
                <Box>
                    <Button size="small" variant="contained" sx={{ mr: 2 }} startIcon={<RemoveRedEyeIcon />} onClick={hanldeViewResponse}>
                        View Responses
                    </Button>
                    <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={handleCreateNew}>
                        Add New Form
                    </Button>
                </Box>
            </Box>
            <hr />
            <Grid container spacing={2}>
                {
                    data?.map(res => {
                        return (
                            <>
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ p: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="h5">{res?.name}</Typography>
                                            <Box>
                                                <Button onClick={() => { navigator.clipboard.writeText(`http://localhost:3000/form-response/${res?.id}`); alert('Link copied to clipboard') }} title="Copy link to share" startIcon={<InsertLinkIcon />}></Button>
                                            </Box>

                                        </Box>
                                        <Typography variant="body1">{res?.description}</Typography>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })
                }

            </Grid>
        </Base>
    )
}


export default FormsLandingPage