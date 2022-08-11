import React from 'react'
import UserLogo from './UserLogo'


export default function Banner(prop) {
    return (
        <header class="py-3 mb-3 border-bottom bg-light">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-4">
                        <h1>
                            <span style={{color: '#000000'}}>Collabor</span>
                            <span style={{color: '#f6c1b2ff'}}>8</span>
                        </h1>
                    </div>
                    <div class="col-4">
                        <h3 style={{color: '#666666'}}>{prop.date.toLocaleTimeString()}</h3>
                    </div>
                    <div class="col-4">
                        <UserLogo first_name={prop.user_first_name}/>
                    </div>
                </div>
            </div>
        </header>
    )
}
