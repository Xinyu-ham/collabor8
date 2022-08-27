import React from 'react';
import Banner from './components/Banner';
import HomePage from './components/HomePage';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/join' element={<JoinRoom />} />
                <Route path='/create' element={<CreateRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App