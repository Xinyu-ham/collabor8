import React from 'react'
import Banner from './Banner';


export default function HomePage() {
    return (
        <div>
            <Banner user_first_name={"Hamlet"} date={new Date()}/>
            <h3>This is the home page!</h3>
        </div>
    );
}