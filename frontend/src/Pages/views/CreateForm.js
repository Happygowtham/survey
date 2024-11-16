import { useEffect, useState } from "react"
import Base from "../../Layout/Base"
import axiosInstance from "../../axiosInstance"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, IconButton, List, ListItem, ListItemText } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


const Forms = ({ view_id, answers }) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        let aid = id || view_id
        axiosInstance(`form-data/${aid}`, {
            method: "GET",
        }).then(res => {
            setData(res)
        }).catch(err => {
            console.log('err: ', err);
        })
        //eslint-disable-next-line
    }, [view_id])

    const hanldeSubmit = () => {
        axiosInstance(`forms/${id}/`, {
            method: "PATCH",
            data: {
                is_published: true
            }
        }).then(res => {
            navigator.clipboard.writeText(`http://localhost:3000/form-response/${res?.id}`);
            alert('Link copied to clipboard')
            navigate('/form')
        }).catch(err => {
            console.log('err: ', err);

        })
    }

    return (
        <>
            <Base>
                <Grid container spacing={0}>
                    <Grid xs={12} md={3} />
                    <Grid xs={12} md={6}>
                        {data?.map((category, index) => (
                            <div key={index}>
                                <Accordion sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        {category.name}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {category?.topics?.map((topic, index) => (
                                            <>
                                                <Accordion sx={{ m: 1 }}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1-content"
                                                        id="panel1-header"
                                                    >
                                                        {topic.name}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        {topic?.questions?.map((question, index) => (
                                                            <List p={0} key={index}>
                                                                <ListItem sx={{ p: 0, }}>
                                                                    <ListItemText sx={{ p: 0 }} primary={index + 1 + ". " + question.text} />
                                                                    {
                                                                        view_id &&
                                                                        <>
                                                                            {
                                                                                answers?.find(answer => answer?.question === question.id)?.response === "no" ?
                                                                                    <IconButton color="success" title="Yes" aria-label="delete">
                                                                                        <DoneIcon />
                                                                                    </IconButton>
                                                                                    :
                                                                                    <IconButton color="error" title="No" aria-label="delete">
                                                                                        <CloseIcon />
                                                                                    </IconButton>
                                                                            }
                                                                        </>

                                                                    }
                                                                </ListItem>
                                                            </List>
                                                        ))}
                                                    </AccordionDetails>
                                                </Accordion >
                                            </>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        ))}
                        {
                            !view_id ?
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Button variant="outlined" sx={{ mr: 2 }}><Link to="/form" style={{ textDecoration: "none" }}>Go Back</Link></Button>
                                    <Button variant="contained" onClick={hanldeSubmit}>
                                        Submit and get link
                                    </Button>
                                </Box> :
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Button variant="outlined" sx={{ mr: 2 }}><Link to="/form" style={{ textDecoration: "none" }}>Go Back</Link></Button>
                                </Box>
                        }
                    </Grid>
                    <Grid xs={12} md={3} />
                </Grid>
            </Base >
        </>
    )
}


export default Forms