import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case FETCH_ALL:
            return action.payload;
        case FETCH_BY_SEARCH:
            return action.payload;
        case FETCH_POST:
            return {...state, post: action.payload};
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}