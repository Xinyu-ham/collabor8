import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, Typography, Box, FormControl, FormHelperText, TextField, Button } from '@material-ui/core'
import Backdrop from '@mui/material/Backdrop';
import { Alert, AlertTitle } from '@material-ui/lab'
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from 'react-router-dom';
import { sendResetEmail } from '../../actions/auth';
import { connect } from 'react-redux'



export default function Signup() {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [signupStatus, setSignupStatus] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const checkMatch = () => {
    setPasswordMatch(password1 === password2)
  }

  const onEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailValid(isEmail(val))
  }

  const handleSubmit = () => {
    setLoading(!loading)
    console.log(email)
  }

  const SignupForm = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl margin="normal" fullWidth>
          <FormHelperText>
            <Typography>
              Email Address
            </Typography>
          </FormHelperText>
          <TextField
              required
              helperText={emailValid ? "" : "Valid email required"}
              error={dirty && !emailValid}
              onBlur={() => {setDirty(!emailValid)}}
              onChange={onEmailChange}
              value={email}
              variant='outlined'
              />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FormHelperText>
            <Typography>
              New Password
            </Typography>
          </FormHelperText>
          <TextField
              fullWidth
              required
              variant="outlined"
              type="password"
              hintText="New Password"
              value={password1}
              onChange={e => {setPassword1(e.target.value)}}
              helperText={passwordMatch ? "" : "Passwords must be the same"}
              onBlur={e => {checkMatch()}}
            />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FormHelperText>
            <Typography>
              Confirm New Password
            </Typography>
          </FormHelperText>
          <TextField
              fullWidth
              required
              error={!passwordMatch}
              variant="outlined"
              type="password"
              hintText="Re-type new Password"
              value={password2}
              onChange={e => {setPassword2(e.target.value)}}
              helperText={passwordMatch ? "" : "Passwords must be the same"}
              onBlur={e => {checkMatch()}}
            />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box justifyContent="space-between" display="flex">
          <Button disabled={!passwordMatch || loading} color="primary" variant='outlined' onClick={handleSubmit}>Confirm</Button>
          <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Button color="secondary" varient='standard' onClick={() => {navigate('/')}}>Back to Home</Button>
        </Box>
      </Grid>
    </Grid>
  )


  return (
    <div>
      <Grid container spacing={5} style={{padding: '20%'}}>
        <Grid item xs={12}>
          <Typography component='h4' variant='h4'>
            Create a new account!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {!signupStatus ? SignupForm : null}
        </Grid>
      </Grid>
    </div>
  )
}
// const mapStateToProps = state => ({
//   passwordResetStatus: state.passwordResetStatus
// });


// export default connect(mapStateToProps, { sendResetEmail })(ResetPassword)