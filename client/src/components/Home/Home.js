import React, { useState, useEffect} from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import { getPosts } from '../../actions/posts';
import useStyles from './styles';
import Pagination from '../Pagination/Pagination';

import useStyles from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    //will read the current URL
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);




    return (
            <Grow in>
                <Container maxWidth='xl'>
                    <Navbar />
                    <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} psotion='static' color='inherit'> 
                                <TextField 
                                name='search' 
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                value='TEST'
                                onChange={() => {}}
                                />
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}
export default Home;