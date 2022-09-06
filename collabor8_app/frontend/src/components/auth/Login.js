import React from 'react'
import { Modal, Typography, Box} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '3px solid #01579b',
  boxShadow: 64,
  p: 4,
};

export default function Login() {
  const [open, toggle] = useState(true)
  const navigate = useNavigate()

  const handleClose = () => {
    toggle(!open);
    navigate(-1);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Log In
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  )
}
