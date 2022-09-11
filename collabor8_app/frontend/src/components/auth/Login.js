import React, { useState } from 'react'
import { Grid, Modal, Typography, Box, FormControl, FormHelperText, TextField, Button} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

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
 
function Login({ login, isAuthenticated }) {
  const [open, toggle] = useState(true)
  const navigate = useNavigate()

  const handleClose = () => {
    toggle(!open);
    navigate(-1);
  }

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const onEmailChange = e => {
    const val = e.target.value;

    setEmail(val);
    setEmailValid(isEmail(val));
  }

  const handleLogin = () => {
    login(email, password);
    if (!isAuthenticated) {
      setError(true);
    };
  };

  if (isAuthenticated) {
    navigate(-1);
  };

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
            <Typography id="modal-modal-title" variant="h4" component="h2">
            Log In
            </Typography> 
            {error && <Alert severity="warning">The email or password provided is incorrect.</Alert>}
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
                  value={password}
                  onChange={e => {setPassword(e.target.value)}}
                />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant='contained' onClick={handleLogin}>Log In</Button>
            <Button color="secondary" varient='underlined' to="/signup" component={Link}>Sign Up</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography><Link to='/reset-password' style={{ color: 'steelblue', textDecoration: 'inherit'}}>Forgot your password?</Link></Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);