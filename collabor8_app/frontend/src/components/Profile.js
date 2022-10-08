// import React, { useState } from 'react'
// import { Backdrop, Button, CircularProgress } from '@material-ui/core'

// export default function Profile() {
//   const [open, setOpen] = useState(false)
//   return (
//     <div>
//       <Button onClick={() => {setOpen(!open)}}>Click Here!</Button>
//       <Backdrop
//       sx={{ color: '#fff', zIndex: 10 }}
//       open={open}
//       onClick={() => {setOpen(!open)}}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </div>
//   )
// }


import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleToggle}>Show backdrop</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}