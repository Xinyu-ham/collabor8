import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Room(props) {
    const { roomId } = useParams()
    const [data, setData] = useState({
        name: 'Room ID not found.',
        code: null,
        deadline: null,
        admin: null
    })

    useEffect(() => {
        fetch('/api/get-room?id=' + roomId.toString()).then((response) => {
            return response.json()
        }).then((data) => {
            setData(
                {
                    name: data.name,
                    code: data.code,
                    deadline: data.deadline,
                    admin: data.admin
                }
            );
        });
    });

    return (
        <div align="left">
            <h3>This is a room</h3>
            <p>Room ID: {data.name}</p>
        </div>
    )
}
