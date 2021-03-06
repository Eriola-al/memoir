import React, { useState, useEffect} from 'react'
import { useDispatch} from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination/Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch(); 

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/');
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
               <Container maxWidth = "xl">
                   <Grid className = {classes.gridContainer} container justifyContent="space-between" alignItems = "stretch" spacing = {3}>
                       <Grid item xs={12} sm={6} md={9}> 
                          <Posts setCurrentId = {setCurrentId} />
                       </Grid>
                       <Grid item xs={12} sm={6} md={3}> 
                       <AppBar className={classes.appBarSearch} position = "static" color = "inherit">
                           <TextField 
                           onKeyDown={handleKeyPress} 
                           name="search" 
                           variant = "outlined" 
                           label = "K??rko Postime" 
                           fullWidth 
                           value={search} 
                           onChange = {(e) => setSearch(e.target.value)}/>
                           <ChipInput 
                           style={{ margin: '10px 0'}} 
                           value={tags} 
                           onAdd={handleAddChip} 
                           onDelete={handleDeleteChip} 
                           label="Etiketat e K??rkimit" 
                           variant="outlined"/>
                           <Button className = {classes.searchButton} variant="contained" onClick={searchPost} color="primary">K??rko</Button>
                       </AppBar>
                           <Form currentId = {currentId} setCurrentId = {setCurrentId} />
                           {(!searchQuery && !tags.length) && (
                            <Paper elevation = {6} className = {classes.pagination}>
                               <Pagination page={page} />
                           </Paper>
                           )}       
                       </Grid>
                   </Grid>
               </Container>
           </Grow>
    );
};

export default Home;
