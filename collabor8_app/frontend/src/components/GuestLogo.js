import React from 'react'
import { useState } from 'react'


const userLogo = new URL("./userLogo.png", import.meta.url)

export default function GuestLogo(prop) {
    const [isHover, setIsHover] = useState(false)
    const handleMouseOn = () => {
        setIsHover(true);
    };
    const handleMouseOff = () => {
        setIsHover(false);
    };

    return (
        <button
        class="btn btn-secondary"
        onMouseEnter={handleMouseOn}
        onMouseLeave={handleMouseOff}
        style={
            {
                backgroundImage: `url(${userLogo})`,
                width: "52px",
                height: "52px",
                margin: "auto",
                display: "flex",
                float: 'right',
                marginTop: "0px",
                marginBottom: "0px",
                borderRadius: "50px",
                borderColor: isHover ? "steelblue": "gray",
                borderWidth: isHover ? "2.5px": "2px",
            }
        }
        >
            <p
            style={
                {
                    margin: "auto",
                    fontSize: "16px",
                    color: "white",
                    height: "50px",
                    width: "50px",
                    borderRadius: "50px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: 'center',
                }
            }
            >
                {prop.first_name.charAt(0)}
            </p>
        </button>
    )
}
