import React, { useState } from 'react'
import { Avatar, Grid, Container, Button, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles'
import Input from './Input';
import Icon from './Icon';
import { signup, signin } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' } ;

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );

    const handleSubmit = (e) => {
      e.preventDefault();

      if(isSignUp) {
        dispatch(signup(formData, history))
      } else {
        dispatch(signin(formData, history))
      }
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
      setIsSignUp((prevIsSignUp) => !prevIsSignUp);
      setShowPassword(false);
    };

    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
        dispatch( { type: 'AUTH' , data: { result, token } });

        history.push('/');
      } catch (error) {
        console.log(error);
      }
    };

    const googleError = () => {
      console.log('Identifikimi në Google ishte i pasuksesshëm.Provo sërish më vonë.');
    };
    
    return (
        <Container component = "main" maxWidth = "xs">
          <Paper className = {classes.paper} elevation = {3}>
            <Avatar className = {classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant = "h5">{ isSignUp ? 'Regjistrohu' : 'Kyçu'}</Typography>
            <form className = {classes.form} onSubmit = {handleSubmit}>
              <Grid container spacing = {2}>
                {
                  isSignUp && (
                    <>
                    <Input name = "firstName" label = "Emri" handleChange = {handleChange} autoFocus half/>
                    <Input name = "lastName" label = "Mbiemri" handleChange = {handleChange} half/>
                    </>
                  )
                }
                <Input name = "email" label = "Adresa e emailit" handleChange = {handleChange} type = "email"/>
                <Input name = "password" label = "Fjalëkalimi" handleChange = {handleChange} type = {showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword}/>
                { isSignUp && <Input name = "confirmPassword" label = "Rivendosni fjalëkalimin" handleChange = {handleChange} type = "password"/> }
              </Grid>
              <Button className = {classes.submit} type = "submit" fullWidth variant = "contained" color = "primary">
                {isSignUp ? 'Regjistrohu' : 'Kyçu'}
              </Button>
              <GoogleLogin 
                 clientId = "780049468590-4jr7lqrplgjj6db9tu36d94qttoa10q1.apps.googleusercontent.com"
                 render = {(renderProps) => (
                   <Button className = {classes.googleButton} color = "primary" fullWidth onClick = {renderProps.onClick} disabled = {renderProps.disabled} startIcon = {<Icon />} variant = "contained">
                     Kyçu me Google 
                     </Button>
                 )}
                 onSuccess = {googleSuccess}
                 onFailure = {googleError}
                 cookiePolicy = "single_host_origin"
              />
              <Grid container justifyContent = "flex-end">
                <Grid item>
                  <Button onClick = {switchMode} >
                    { isSignUp ? 'Keni tashmë një llogari? Identifikohuni' : 'Nuk keni një llogari? Regjistrohuni'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
    )
}

export default Auth;
