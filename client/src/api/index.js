import axios from 'axios';
import jwt_decode from 'jwt-decode'

// const url = 'http://localhost:5000/posts';

const API = axios.create({ baseURL: 'http://localhost:5000'})

export const createOrGetUser = (response) => {
    const decoded = jwt_decode(response.credential);
    console.log('decoded token in getUser', decoded);

    return decoded;
};



export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`posts/${id}/likePost`);

