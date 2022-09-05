import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Room(props) {
    const { code } = useParams()
    const [data, setData] = useState({
        name: 'Room ID not found.',
        code: null,
        deadline: null,
        admin: null
    })

    useEffect(() => {
        fetch('/api/get-room?code=' + code.toString()).then((response) => {
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
    }, []);

    return (
        <div align="left">
            <h3>Welcome to project {data.name}</h3>
            <p>Room code: {data.code}</p>
        </div>
    )
}
