import React, { useState, useEffect } from 'react'
import { Modal, CircularProgress, Grid, Typography, Box, FormControl, FormHelperText, TextField, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import isEmail from 'validator/lib/isEmail';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sendResetEmail } from '../../actions/auth';
import { connect } from 'react-redux'

function ResetPassword({ sendResetEmail, passwordResetStatus }) {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const onEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setEmailValid(isEmail(val))
  }

  const onSubmit = (e) => {
    sendResetEmail(email);
    setLoading(!loading);
    console.log(loading)
    console.log(passwordResetStatus)
  }

  useEffect(() => {
    if (passwordResetStatus===204) {
      setLoading(false);
      setResetSuccess(true)
    } 
  
    if (passwordResetStatus===400) {
      setLoading(false);
      setResetSuccess(false)
    }
  }, [passwordResetStatus])


  const navigate = useNavigate()

  const ResetPasswordFailed = (
    <Grid item xs={12}>
      <Alert severity="warning">
        <AlertTitle>Account not found</AlertTitle>
        Email does not exist.
      </Alert>
    </Grid>
  );

  const LoadingCircle = (
    <CircularProgress color="primary" />
  )

  const ResetPasswordForm = (
    <Grid container spacing={2}>
      { resetSuccess === null ? null : ResetPasswordFailed }
      <Grid item xs={12}>
          <FormControl fullWidth variant="standard">
            <FormHelperText>
              <div align="center">
                <Typography component='p' variant='p'>
                  Email Address
                </Typography>
              </div>
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
        <Grid item xs={12}>
          {loading ? LoadingCircle : null}
          <Box justifyContent="space-between" display='flex'>
            <Button disabled={!emailValid} variant='outlined' onClick={onSubmit} color='primary'>Reset</Button>
            <Button variant='standard' onClick={() => {navigate(-1)}} color='secondary'>Cancel</Button>
          </Box>

        </Grid>
    </Grid>
  )

  const ResetPasswordSuccess = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Alert severity="success">
          Please check your email to continue password reset.
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <Button color='secondary' onClick={() => {navigate('/')}}>
          Back to Home
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Grid container spacing={5} style={{padding: '20%'}}>
        <Grid item xs={12}>
          <Typography component='h4' variant='h4'>
            Reset your Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
        {resetSuccess ? ResetPasswordSuccess : ResetPasswordForm}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  passwordResetStatus: state.passwordResetStatus
});


export default connect(mapStateToProps, { sendResetEmail })(ResetPassword)