import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Grid, ButtonGroup, IconButton, Typography } from "@material-ui/core"
import { GitHub, Instagram, Facebook } from '@mui/icons-material'
import { makeStyles } from '@material-ui/styles';

import Banner from './components/Banner';
import HomePage from './components/HomePage';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/Room';
import store from './store'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Activate from './components/auth/Activate';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordConfirmation from './components/auth/ResetPasswordConfirmation';


const boxStyles = makeStyles((theme) => ({
    root: {
        background: "linear-gradient(62deg, #8EC5FC 30%, #E0C3FC 70%)",
        overflow: "hidden",
        overflowY: "auto",
        scrollBehavior: "smooth",
        height: '100vh',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            backgroundColor: 'rgba(0,0,0,.15)',    

        },
        '&:active::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.25)',   
        }
    }
}));

function App() {
    const classes = boxStyles();
    return (
            <Box className={classes.root}>
                <BrowserRouter>
                    <Banner user_first_name={"Hamlet"} date={new Date()} auth={true}/>
                    <Box
                    minHeight='550px' 
                    height='100vh'
                    display="flex"
                    flexDirection="column"
                    align="center"
                    justifyContent='center'
                    >
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/join' element={<JoinRoom />} />
                            <Route path='/create' element={<CreateRoom />} />
                            <Route path='/room/:code' element={<Room />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/reset-password' element={<ResetPassword />} />
                            <Route path='/reset-password-confirmed/:uid/:token' element={<ResetPasswordConfirmation />} />
                            <Route path='/activate/:uid/:token' element={<Activate />} />
                        </Routes>
                    </Box>
                </BrowserRouter>
                <Box
                display='flex' spacing={1} flexDirection="column" justifyContent='center'
                sx={{
                    minHeight: '100px',
                    height: '10%',
                    backgroundColor: '#EEEEEE',
                    opacity: [0.5],
                    '&:hover': {
                    backgroundColor: 'white',
                    opacity: [0.7],
                    },
                }}
                >
                    <Grid container align='center'>
                        <Grid item xs={6}>
                            <ButtonGroup variant="text">
                                <IconButton><GitHub /></IconButton>
                                <IconButton><Instagram /></IconButton>
                                <IconButton><Facebook /></IconButton>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component='p' variant='p'>© Some copyright text</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
    );
}

export default App