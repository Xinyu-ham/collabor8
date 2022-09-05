import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Box } from "@material-ui/core";
import dayjs from "dayjs"
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate, Link } from "react-router-dom";



export default function CreateRoom() {
    const [date, setDate] = useState(
        dayjs(new Date())
    );
    const [name, setName] = useState("");
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleCreate = () => {
        if (name==='') {
            setError("Project name cannot be empty!")
        } else {
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
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component='h4' variant='h4'>
                        Create a room for your project
                    </Typography>
                </Grid>
                <Grid item md={8} xs={12}>
                    <FormControl fullWidth variant="standard" component="fieldset">
                        <FormHelperText>
                            <div align="center">Name of project</div>
                        </FormHelperText>
                        <TextField
                        required={true}
                        error={error}
                        label="Required"
                        variant="standard"
                        onChange={(val) => {setName(val.target.value);}}
                        helperText={error}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={4} xs={12}>
                <FormControl variant="standard" component="fieldset">
                    <FormHelperText>
                        <div align="center">Deadline</div>
                    </FormHelperText>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        required
                        label="Required"
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
                        <Button color="secondary" to="/" component={Link}>Back</Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

// export default withRouter(CreateRoom)