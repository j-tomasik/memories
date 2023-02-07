import axios from 'axios';
import jwt_decode from 'jwt-decode'

const url = 'http://localhost:5000/posts';

export const createOrGetUser = (response) => {
    const decoded = jwt_decode(response.credential);
    console.log('decoded token in getUser', decoded);

    return decoded;
}



export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost)
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);