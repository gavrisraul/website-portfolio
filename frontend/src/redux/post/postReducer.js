import { GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE } from './postTypes';
import { POST_POST, POST_POST_SUCCESS, POST_POST_FAILURE } from './postTypes';

const initialState = {
    post: {},
    postLike: {},
    error: '',
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST: return {
            ...state,
            post: { success: 1, loaded: false },
        };
        case GET_POST_SUCCESS: return {
            ...state,
            post: { ...action.payload, loaded: true },
            postLike: {...action.payload, loaded: true},
            error: '',
        };
        case GET_POST_FAILURE: return {
            ...state,
            post: {},
            error: { ...action.payload, loaded: false },
            postLike: {},
        };
        case POST_POST: return {
            ...state,
            postLike: { success: 1 },
        }
        case POST_POST_SUCCESS: return {
            ...state,
            postLike: action.payload,
            error: '',
        }
        case POST_POST_FAILURE: return {
            ...state,
            postLike: {},
            error: action.payload,
        }
        default: return state;
    }
};

export default postReducer;