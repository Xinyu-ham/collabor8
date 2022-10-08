import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, Typography, Box, FormControl, FormHelperText, TextField, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useNavigate, useParams } from 'react-router-dom'
import { passwordResetConfirmation } from '../../actions/auth'
import { connect } from 'react-redux'

function ResetPasswordConfirmation({ passwordResetConfirmation, passwordResetStatus }) {
  const { uid, token } = useParams()

  const navigate = useNavigate()
  
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const checkMatch = () => {
    setPasswordMatch(password1 === password2)
  }
  
  const handleSubmit = () => {
    passwordResetConfirmation(uid, token, password1, password2);
    setLoading(!loading)
  }

  useEffect(() => {
    // console.log(passwordResetStatus)
    if (passwordResetStatus===204) {
      setLoading(false);
      setResetSuccess(true);
    }
  }, [passwordResetStatus])
  
  const LoadingCircle = (
    <CircularProgress color="primary" />
  )

  const ResetPasswordForm = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl margin="normal" fullWidth>
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
      <Grid item xs={12}>
        <FormControl margin="normal" fullWidth>
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
        {loading ? LoadingCircle : null}
        <Box justifyContent="space-between" display="flex">
          <Button disabled={!passwordMatch || loading} color="primary" variant='outlined' onClick={handleSubmit}>Confirm</Button>
          <Button color="secondary" varient='standard' onClick={() => {navigate('/')}}>Back to Home</Button>
        </Box>
      </Grid>
    </Grid>
  )

  const successConfirmation = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Alert severity="success">
          Password successfully changed! Please log in again.
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
      <Grid container spacing={2} style={{padding: '20%'}}>
        <Grid item xs={12}>
          <Typography component='h4' variant='h4'>
            Reset your password
          </Typography>
        </Grid>
        {resetSuccess ? successConfirmation : ResetPasswordForm}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  passwordResetStatus: state.passwordResetStatus
});


export default connect(mapStateToProps, { passwordResetConfirmation })(ResetPasswordConfirmation)