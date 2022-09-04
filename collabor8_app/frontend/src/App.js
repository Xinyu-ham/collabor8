import React from 'react';
import Banner from './components/Banner';
import HomePage from './components/HomePage';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/Room';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box"

function App() {
    return (
        <div style={{background: "linear-gradient(45deg, #efc4a4 20%, #d9cce3 85%)"}}>
            <Banner user_first_name={"Hamlet"} date={new Date()} auth={true}/>
            <Box 
            minHeight='65vh'
            display="flex"
            flexDirection="column"
            align="center"
            justifyContent='center'
            padding={10}
            margin={5}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/join' element={<JoinRoom />} />
                        <Route path='/create' element={<CreateRoom />} />
                        <Route path='/room/:code' element={<Room />} />
                    </Routes>
                </BrowserRouter>
            </Box>
            <Box 
            minHeight='35vh'
            padding={10}
            margin={5}
            ></Box>
        </div>
    );
}

export default App