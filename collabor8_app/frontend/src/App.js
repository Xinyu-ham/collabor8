import React from 'react';
import Banner from './components/Banner';

function App() {
    return (
        <div class="container">
            <Banner date={new Date()}/>
        </div>
    )
}

export default App