import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);

    const hasLikedPost = likes.find((like) => like=== user?.sub)

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if(hasLikedPost) {
            setLikes(likes.filter((id) => id !== user?.sub))
        } else {
            setLikes([...post.likes, user?.sub])
        }

    }

    const Likes = () => {
        if (likes.length > 0) {
            
            return(
                likes.find((like) => like === (user?.sub))
                ? (
                    <> <ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length -1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` } </>
                ) : (
                    <> <ThumbUpAltOutlinedIcon fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                )
            );
        };

        return <> <ThumbUpAltOutlinedIcon fontSize='small'/>&nbsp;Like</>
    };

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    }

    
    return(
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}> 
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {/* {(user?.sub === post?.creator) && (
                    <div className={classes.overlay2}>
                    <Button style={{color: 'blue'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium"/>
                    </Button>
                </div>
                )} */}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                    <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color={"textSecondary"} component="p" >{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>

                <Button size="small" color="primary" disabled={!user?.sub} onClick={handleLike}>
                    <Likes />
                </Button>

                {(user?.sub === post?.creator) && (
                    <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium"/>
                    </Button>
                </div>
                )}

                {(user?.sub === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
                )}
                


            </CardActions>
                
        </Card>
    )
}

export default Post;