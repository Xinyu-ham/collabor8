import React from 'react'
// import userIcon from './images/user.ico'

export default function UserLogo(prop) {
    return (
        <button
        class="btn btn-secondary"
        style={
            {
                backgroundImage: "url(/userLogo.png)",
                width: "52px",
                height: "52px",
                margin: "auto",
                display: "flex",
                float: 'right',
                marginTop: "0px",
                marginBottom: "0px",
                borderRadius: "50px",
                borderWidth: "2px"
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
