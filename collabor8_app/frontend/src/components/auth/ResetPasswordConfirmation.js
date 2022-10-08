import React, { useState } from 'react'
import { Grid, Typography, Box, FormControl, FormHelperText, TextField, Button } from '@material-ui/core'

export default function ResetPasswordConfirmation(props) {
  const uid = props.uid
  const token = props.token
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  return (
    <div>
      <Grid container spacing={2} style={{padding: '20%'}}>
        <Grid item xs={12}>
          <Typography component='h4' variant='h4'>
            Reset your password
          </Typography>
        </Grid>
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
                variant="outlined"
                helperText= {passwordMatch ? "" : "Passwords are different"}
                type="password"
                hintText="Re-type new Password"
                value={password2}
                onChange={e => {setPassword2(e.target.value)}}
              />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}
