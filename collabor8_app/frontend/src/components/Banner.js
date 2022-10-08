import React, { useEffect } from 'react'
import UserLogo from './UserLogo'
import GuestLogo from './GuestLogo'
import { animated, useSpring } from 'react-spring'
import { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Navigate, useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkAuthenticated, load_user, logout } from '../actions/auth'

function Banner(prop) {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const staticTitle = (
        <h1>
            <span style={{color: '#000000'}}>C</span>
            <span style={{color: '#f6c1b2ff'}}>8</span>
        </h1>
    )

    const style = useSpring({
         x: isHover ? 0 : -300
    });

    const dynamicTitle = (
        <animated.div style={style}>
            <h1>
                <span style={{color: '#000000'}}>Collabor</span>
                <span style={{color: '#f6c1b2ff'}}>8</span>
            </h1>
        </animated.div>
    )
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    const handleLogin = (event) => {
        navigate('/login')
        setAnchorEl(null);
    }

    const handleLogout = (event) => {
        prop.logout();
        setAnchorEl(null);
    }

    useEffect(
        () => {
            prop.checkAuthenticated();
            prop.load_user();
        }, []
    )

    const MenuItems = () => {
        if (!prop.isAuthenticated) {
            return (
                <div>
                    <MenuItem onClick={handleLogin}>Log In</MenuItem>
                </div>
            )
        } else {
            return (
                <div>
                    <MenuItem onClick={() => {navigate('/profile')}}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My projects</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </div>
            )
        }
        
    };

    const Logo = () => {
        if (!prop.isAuthenticated) {
            return (
                <div>
                    <GuestLogo />
                </div>
            )
        } else {
            return (
                <div>
                    <UserLogo first_name={"Hamlet"} />
                </div>
            )
        }
        
    };


    return (
        <AppBar position="static" 
        onMouseEnter={() => {setIsHover(true);}}
        onMouseLeave={() => {setIsHover(false);}}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.3)"}}
        >
            <Toolbar padding={1} margin={1}>
                <Typography
                variant="h3"
                noWrap
                component="a"
                href="/"
                style={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: "inherit",
                    letterSpacing: '.5rem',
                    textDecoration: 'none',
                    underline: 'none',
                    flexGrow: 1,
                    maxHeight: 100,
                    fontSize: '1.5rem',
                    
                }}
                >
                    {isHover ? dynamicTitle : staticTitle}
                </Typography>
                <div>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    alignItem="right"
                    marginRight={0}
                    marginLeft="auto"
                    >
                        <Logo/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItems />
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>

    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});


export default connect(mapStateToProps, { checkAuthenticated, load_user, logout })(Banner);