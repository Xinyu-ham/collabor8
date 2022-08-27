import React from 'react'
import Banner from './Banner'

export default function CreateRoom() {
    return (
        <div>
            <Banner user_first_name={"Hamlet"} date={new Date()}/>
            <h3>This is the cretae room page!</h3>
        </div>
    );
}
