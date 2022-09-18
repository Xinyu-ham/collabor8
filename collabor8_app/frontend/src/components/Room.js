import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Grid, IconButton, Box, ButtonGroup, Typography } from '@material-ui/core'
import { EmojiPeople, Settings, Info } from '@mui/icons-material'
import MemberList from './MemberList'
import StoryLine from './StoryLine'
import { styled, useTheme } from '@mui/material/styles';

const drawerWidth = 25;

const openedMixin = (theme) => ({
    width: `${drawerWidth}vw`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0
});

const SideBar = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexShrink: 1,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .Box-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .Box-paper': closedMixin(theme),
      }),
    }),
);

const MainBody = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: '100vw',//`calc(100vw - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

export default function Room(props) {
    const { code } = useParams()
    const [data, setData] = useState({
        name: 'Room ID not found.',
        code: null,
        deadline: null,
        admin: null
    })
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch('/api/get-room?code=' + code.toString()).then((response) => {
            return response.json()
        }).then((data) => {
            setData(
                {
                    name: data.name,
                    code: data.code,
                    deadline: data.deadline,
                    admin: data.admin
                }
            );
        });
    }, []);



    return (
        <Box display='flex' minHeight='100vh'>
            <SideBar open={open}>
                <Box sx={{
                    minHeight: '100vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    // borderRight: '8px solid rgba(255, 255, 255, 0.15)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        // borderRight: '8px solid rgba(255, 255, 255, 0.00)'
                    }
                }}>
                    <MemberList />
                </Box>
            </SideBar>
            <MainBody open={open}>
                <Box padding='8px' margin='8px'>
                    <Grid container justify='flex-end'>
                        <ButtonGroup variant='outlined'>
                            <IconButton onClick={() => { setOpen(!open)}}>
                                <EmojiPeople />
                            </IconButton><IconButton onClick={() => { setOpen(!open)}}>
                                <Info />
                            </IconButton>
                            <IconButton onClick={() => { setOpen(!open)}}>
                                <Settings />
                            </IconButton>
                        </ButtonGroup>
                    </Grid>
                </Box>
                <Box>
                    <Typography component='h4' variant='h4'>
                        Welcome to {data.name}
                    </Typography>
                    <StoryLine /> 
                </Box>
            </MainBody>
        </Box>
    )
}

