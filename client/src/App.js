import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memoir from './images/memoir.png';

const App = () => {
    return(
       <Container maxwidth = "lg">
           <AppBar position = "static" color = "inherit">
               <Typography variant = "h2" align = "center">Memoir</Typography>
               <img src={memoir} alt="memories" width = "500" height = "500" />
           </AppBar>
           <Grow in>
               <Container>
                   <Grid container justify="space-between" alignItems = "stretch" spacing = {3}>
                       <Grid item xs={12} sm={7}> 
                          <Posts />
                       </Grid>
                       <Grid item xs={12} sm={4}> 
                           <Form />
                       </Grid>
                   </Grid>
               </Container>
           </Grow>
       </Container>
    );
}

export default App;