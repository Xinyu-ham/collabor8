import React from 'react';
import Banner from './components/Banner';

function App() {
    return (
        <div class="container">
            <Banner 
                date={new Date()}
                user_first_name="Hamlet"
            />
        </div>
    )
}

export default App