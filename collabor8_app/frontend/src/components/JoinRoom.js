import React, { useState } from 'react'
import { Grid, Typography, TextField, Button, FormControl, Box, InputAdornment } from '@material-ui/core'

import { Link, useNavigate } from 'react-router-dom'
import { CoPresent } from '@mui/icons-material';

export default function JoinRoom() {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const handleJoinButton = () => {
        if (code === "") {
            setError("Room Code cannot be empty!")
        } else {
            fetch('/api/join-room?code=' + code).then((response) => {
                if (response.ok) {
                    navigate('/room/' + code)
                } else {
                    setError('Invalid room code!');
                }
            })
        }
    }


    return (
        <Grid container spacing={2} style={{ paddingLeft: "5%", paddingRight: "5%"}}>
            <Grid item xs={12} alignContent="center">
                <Typography component='h4' variant='h4'>
                    Join a project
                </Typography>
            </Grid>
            <Grid item xs={12} alignContent="center">
                <FormControl fullWidth>
                    <TextField 
                    error={error}
                    placeholder="Enter a Project Code"
                    helperText={error}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <CoPresent />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(val) => {setCode(val.target.value);}}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} alignContent="center">
                <Box justifyContent="space-between" display="flex">
                    <Button color="primary" onClick={handleJoinButton}>Join</Button>
                    <Button color="secondary" to="/" component={Link}>Back</Button>
                </Box>
            </Grid>
            
        </Grid>
    );
}
