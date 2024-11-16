import { useEffect, useState } from "react"
import Forms from "./CreateForm"
import axiosInstance from "../../axiosInstance"
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import Base from "../../Layout/Base"


const ViewResponses = () => {

    const [data, setData] = useState([])
    const [selectedForm, setSelectedForm] = useState("")
    const [answers, setAnswers] = useState([])
    console.log('answers: ', answers);

    useEffect(() => {
        axiosInstance('forms/', {
            method: "GET",
        }).then(res => {
            setData(res)
        })
        //eslint-disable-next-line
    }, [])

    const handleChange = (event) => {
        setSelectedForm(event.target.value)
        axiosInstance(`answer/?form=${event.target.value}`, {
            method: "GET",
        }).then(res => {
            setAnswers(res)
        })
    };

    return (
        <Base>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Select Form to view response</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedForm}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                >
                    {data.map((item) => (
                        <MenuItem
                            key={item?.id}
                            value={item?.id}
                        >
                            {item?.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {
                (selectedForm !== "" && answers.length === 0) && <h5> No Answers Yet</h5>
            }
            {
                selectedForm !== "" && <Forms view_id={selectedForm} answers={answers} />
            }
        </Base >
    )
}

export default ViewResponses