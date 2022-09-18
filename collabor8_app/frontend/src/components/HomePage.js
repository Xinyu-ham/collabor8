import { Link } from 'react-router-dom'
import React from 'react'
import { Grid, ButtonGroup, Button, Typography } from '@material-ui/core'



export default function HomePage() {
    return (
        <Grid 
        container spacing={4}
        alignContent="center"
        direction="row"
        justifyContent='center'
        display="flex"
        >
            <Grid item xs={12}>
                <Typography component='h4' variant='h4'>
                        Plan for your project now!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup variant="text">
                    <Button color="primary" to="/create" component={Link}>Create New</Button>
                    <Button color="secondary" to="/join" component={Link}>Join Existing</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}
