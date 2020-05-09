import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from './postsTypes';

const initialState = {
    posts: [],
    error: '',
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS: 
        return {
            ...state,
            posts: { success: 1, loaded: false },
        };
        case GET_POSTS_SUCCESS:
        return {
            ...state,
            posts: { postsArray: action.payload, loaded: true },
            error: '',
        };
        case GET_POSTS_FAILURE: return {
            ...state,
            posts: {},
            error: { postsArray: action.payload, loaded: false },
        };
        default: return state;
    }
};

export default postsReducer;