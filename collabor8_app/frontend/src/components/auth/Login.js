import React, { useState } from 'react'
import { Grid, Modal, Typography, Box, FormControl, FormHelperText, TextField, Button, ButtonGroup} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';


const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  // height: '350px',
  display: 'flex',
  flexDirection: 'column',

  bgcolor: 'background.paper',
  border: '3px solid #01579b',
  boxShadow: 64,
  opacity: 0.75,
  p: 4,
};

export default function Login() {
  const [open, toggle] = useState(true)
  const navigate = useNavigate()
  const [cred, setCred] = useState({
    email: '',
    password: ''
  })

  const handleClose = () => {
    toggle(!open);
    navigate(-1);
  }

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [dirty, setDirty] = useState(false);

  const onEmailChange = e => {
    const val = e.target.value;

    setEmail(val);
    setEmailValid(isEmail(val));
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={1}
          style={{
            paddingTop: 5,
            marginLeft:10,
            paddingRight: 25,
            marginBottom: 25
          }}
        >
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
            Log In
            </Typography> 
          </Grid>
          <Grid item xs={12}>
            <FormControl margin="normal" fullWidth>
              <FormHelperText>
                <Typography>
                  Email Address
                </Typography>
              </FormHelperText>
              <TextField
                  fullWidth
                  required
                  helperText= {emailValid ? "" : "Valid email required"}
                  error={dirty && !emailValid}
                  onBlur={() => {setDirty(!emailValid)}}
                  onChange={onEmailChange}
                  variant="outlined"
                  value={email}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <FormHelperText>
                <Typography>
                  Password
                </Typography>
              </FormHelperText>
              <TextField
                  fullWidth
                  required
                  variant="outlined"
                  type="password"
                  hintText="Password"
                />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant='contained'>Log In</Button>
            <Button color="secondary" varient='underlined'>Sign Up</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
