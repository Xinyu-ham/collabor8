import React from 'react';
import Banner from './Banner';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box"
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react"
import { Link } from "react-router-dom";


export default function CreateRoom() {
    const [date, setDate] = useState(
        dayjs(new Date())
    );
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
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl variant="standard" component="fieldset">
                            <FormHelperText>
                                <div align="center">Deadline</div>
                            </FormHelperText>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                inputFormat='MM/DD/YYYY'
                                value={date}
                                onChange={(val) => {setDate(val);}}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Box justifyContent="space-between" display="flex">
                            <Button variant="outlined">Create Room</Button>
                            <Button color="secondary">Back</Button>
                        </Box>
                    </Grid>
                </Grid>
        </div>
    );
}
