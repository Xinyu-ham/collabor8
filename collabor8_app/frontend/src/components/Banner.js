import React from 'react'

export default function Banner(prop) {
    return (
        <header class="py-3 mb-3 border-bottom">
            <div class="container-fluid d-grid gap-3 align-items-center">
                <h1 style={{color: '#111111'}}>{prop.date.toLocaleTimeString()}</h1>
            </div>
        </header>
    )
}
