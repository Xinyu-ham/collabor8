import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from "@material-ui/core";
import dayjs from "dayjs"
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import withRouter from './withRouter'


export default function CreateRoom() {
    const [date, setDate] = useState(
        dayjs(new Date())
    );
    const [name, setName] = useState("Unnamed project");

    const navigate = useNavigate()

    const handleCreate = () => {
        console.log(name.toString())
        console.log(JSON.stringify(
            {
                name: name.toString(),
                deadline: date.format('YYYY/MM/DD HH:mm:ss')
            }
        ))
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    name: name.toString(),
                    deadline: date.format('YYYY-MM-DDTHH:mm:ss')
                }
            )
        };
        fetch("/api/create-room", requestOptions)
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (data) => {
                    navigate("/room/" + data.code.toString());
                }
            )
    };

    const handleBack = () => {
        console.log("Back")
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component='h4' variant='h4'>
                        Create a room for your project!
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <FormControl fullWidth variant="standard" component="fieldset">
                        <FormHelperText>
                            <div align="center">Name of project</div>
                        </FormHelperText>
                        <TextField
                        required={true}
                        variant="standard"
                        onChange={(val) => {setName(val.target.value);}}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                <FormControl variant="standard" component="fieldset">
                    <FormHelperText>
                        <div align="center">Deadline</div>
                    </FormHelperText>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        inputFormat='MM/DD/YYYY HH:mm'
                        value={date}
                        onChange={(val) => {setDate(val);}}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Box justifyContent="space-between" display="flex">
                        <Button variant="outlined" onClick={handleCreate}>Create Room</Button>
                        <Button color="secondary" onClick={handleBack}>Back</Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

// export default withRouter(CreateRoom)