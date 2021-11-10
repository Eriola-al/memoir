import React, { useState, useEffect} from 'react'
import { useDispatch} from 'react-redux';
import { Container, Grow, Grid, Paper } from '@material-ui/core';

import { getPosts } from '../../actions/posts';
import Pagination from '../Pagination/Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { mergeClasses } from '@material-ui/styles';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Grow in>
               <Container>
                   <Grid container justifyContent="space-between" alignItems = "stretch" spacing = {3}>
                       <Grid item xs={12} sm={7}> 
                          <Posts setCurrentId = {setCurrentId} />
                       </Grid>
                       <Grid item xs={12} sm={4}> 
                           <Form currentId = {currentId} setCurrentId = {setCurrentId} />
                           <Paper elevation = {6}>
                               <Pagination />
                           </Paper>
                       </Grid>
                   </Grid>
               </Container>
           </Grow>
    );
};

export default Home;
