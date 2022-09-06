import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box"

import Banner from './components/Banner';
import HomePage from './components/HomePage';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/Room';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Activate from './components/auth/Activate';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordConfirmation from './components/auth/ResetPasswordConfirmation';

function App() {
    return (
        <div style={{background: "linear-gradient(62deg, #8EC5FC 30%, #E0C3FC 70%)"}}>
            <BrowserRouter>
            <Banner user_first_name={"Hamlet"} date={new Date()} auth={true}/>
            <Box 
            minHeight='50vh'
            display="flex"
            flexDirection="column"
            align="center"
            justifyContent='center'
            padding={10}
            margin={5}
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
            <Box 
            minHeight='35vh'
            padding={10}
            margin={5}
            ></Box>
            </BrowserRouter>
        </div>
    );
}

export default App