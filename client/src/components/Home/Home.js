import React, { useState, useEffect} from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import useStyles from './styles';
import { GoogleLogin, googleLogout } from '@react-oauth/google';


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    

    return (
            <Grow in>
                <Container>
                    <GoogleLogin client_id = {"389219677395-hp7u1fgqgpj1rll3v4hurr1s38mclnkv.apps.googleusercontent.com"}
                        onSuccess={(response) => console.log(response)}
                        onError={() => console.log('error')}
                    />
                    <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}
export default Home;