import React, { useState } from 'react'
import { Typography, FormHelperText, TextField, FormControl } from '@material-ui/core'
import isEmail from 'validator/lib/isEmail'

export default function EmailField(prop) {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [dirty, setDirty] = useState(false);

  return (
    <FormControl>
        <FormHelperText>
            <Typography xs={prop.xs}>
                Email Address
            </Typography>
            <TextField
                error={dirty && !emailValid}
                onBlur={() => {setDirty(!emailValid)}}
                onChange={e => {setEmail(e.target.value); setEmailValid(isEmail(e.target.value))}}
                variant="outlined"
                value={email}
            />
        </FormHelperText>
    </FormControl>
  )
}
