import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';


const ResponseForm = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [input, setInput] = useState({});

    useEffect(() => {
        axiosInstance(`form-data/${id}`, {
            method: "GET",
        }).then(res => {
            setData(res)
        }).catch(err => {
            console.log('err: ', err);
        })
        //eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        axiosInstance('answer/', {
            method: "POST",
            data: { answers: { ...input }, form: id }
        }).then(res => {
            if (currentStep === data.length - 1) {
                alert('Form submitted successfully. Thank you for your response.')
                navigate('/form')
            }
            else {
                setCurrentStep(currentStep + 1)
            }
            setInput({})
        }).catch(err => {
            console.log('err: ', err);
        })
    }

    return (
        <>
            <Box sx={{ width: '100%', pt: 2 }}>
                <Stepper activeStep={1} alternativeLabel>
                    {data.map((item) => (
                        <Step key={item?.name}>
                            <StepLabel>{item?.name}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Container sx={{ mt: 3 }}>
                    {
                        data?.[currentStep]?.topics?.map(item => {
                            return (
                                <Box sx={{ pt: 1 }}>
                                    <Typography variant="h5">{item?.name}</Typography>
                                    <Box sx={{ pl: 3 }}>
                                        {
                                            <FormControl>
                                                {item?.questions?.map((question, index) => (
                                                    <>
                                                        <Typography variant='body1'>{index + 1}.  {question.text}<span style={{ color: "red" }}> *</span></Typography>
                                                        <RadioGroup
                                                            row
                                                            name={question.id}
                                                            onChange={(e) => handleChange(e)}
                                                            value={input[question.id] || ''}
                                                        >
                                                            <FormControlLabel value="yes" control={<Radio size='small' />} label="Yes" />
                                                            <FormControlLabel value="no" control={<Radio size='small' />} label="No" />
                                                        </RadioGroup>
                                                    </>
                                                ))}
                                            </FormControl>
                                        }
                                    </Box>
                                </Box>
                            )
                        })
                    }
                    <Typography variant='body2' color={"error"} sx={{ mt: 2 }}>* Note: Once you submit the form, you cannot edit it.</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            disabled={data?.[currentStep]?.topics?.reduce((acc, topic) => acc + topic.questions.length, 0) !== Object.keys(input).length}>
                            {currentStep === data.length - 1 ? 'Submit and Finish' : 'Next'}
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default ResponseForm