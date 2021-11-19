import React, { useState, useRef} from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../action/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState([1, 2, 3, 4]);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = () => {
        const finalComment = `${user.result.name}: ${comment}`;
        dispatch(commentPost(finalComment, post._id));
    };

    return(
        <div>
            <div className = {classes.commentsOuterContainer}>
                <div className = {classes.commentsInnerContainer}>
                    <Typography gutterBottom variant = "h6">Komente</Typography>
                    {comments.map((c,i) => (
                        <Typography key={i} gutterBottom variant = "subtitle1">
                            Komenti {i}
                        </Typography>
                    ))}
                </div>
                <div style = {{ width: '70%'}}>
                    <Typography gutterBottom variant = "h6">Shkruaj një koment</Typography>
                    <TextField 
                    fullWidth
                    rows = {4}
                    variant = "outlined"
                    label = "Koment"
                    multiline
                    value = {comment}
                    onChange = {(e) => setComment(e.target.value)}
                    />
                    <Button style = {{ marginTop: '10px'}} fullWidth disabled = {!comment} variant = "contained" color = "primary" onClick = {handleClick}>
                        Komento
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;