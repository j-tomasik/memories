import axios from 'axios';
import jwt_decode from 'jwt-decode'

// const url = 'http://localhost:5000';
// https://mems-app.herokuapp.com

const API = axios.create({ baseURL: 'https://mems-app.herokuapp.com'});


API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).sub}`
    }

    return req;
});

export const createOrGetUser = (response) => {
    const decoded = jwt_decode(response.credential);

    return decoded;
};


export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags} `);
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`posts/${id}/likePost`);
export const commentPost = (value, id) => API.post(`posts/${id}/commentPost`, {value});

