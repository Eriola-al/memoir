import React from 'react'
import {Link} from 'react-router-dom';
import { AppBar, Button, Typography, Toolbar, Avatar } from '@material-ui/core';

import useStyles from './styles';
import memoir from '../../images/memoir.png';


const Navbar = () => {
    const classes = useStyles();
    
    const user = null; 

    return (
        <AppBar className = {classes.appBar} position = "static" color = "inherit">
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className = {classes.heading} variant = "h2" align = "center">Memoir</Typography>
            <img className = {classes.image} src={memoir} alt="memories" height = "60" />
            </div>
            <Toolbar className = {classes.toolbar}>
                {user ? (
                    <div className = {classes.profile}>
                        <Avatar className = {classes.purple} alt = {user.result.name} src = {user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className = {classes.userName} variant = "h6" >{user.result.name}</Typography>
                        <Button variant = "contained" color = "secondary">Dil</Button>
                    </div>
                ) : (
                    <Button component = {Link} to = "/auth" variant = "contained" color = "primary" >Kyçu</Button>
                )}
            </Toolbar>     
        </AppBar>
    );
};

export default Navbar;
