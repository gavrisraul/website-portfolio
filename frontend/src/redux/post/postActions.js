import axios from 'axios';
import { GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE } from './postTypes';
import { POST_POST, POST_POST_SUCCESS, POST_POST_FAILURE } from './postTypes';

export const getPost = ()  => {
    return {
        type: GET_POST,
    };
};

export const getPostSuccess = post  => {
    return {
        type: GET_POST_SUCCESS,
        payload: post,
    };
};

export const getPostFailure = error  => {
    return {
        type: GET_POST_FAILURE,
        payload: error,
    };
};

export const postPost = ()  => {
    return {
        type: POST_POST,
    };
};

export const postPostSuccess = postLike  => {
    return {
        type: POST_POST_SUCCESS,
        payload: postLike,
    };
};

export const postPostFailure = error  => {
    return {
        type: POST_POST_FAILURE,
        payload: error,
    };
};

export const getPostRequest = (id) => {
    return (dispatch) => {
        dispatch(getPost())
        axios.get(`http://127.0.0.1:8000/api/post/${id}/`)
            .then(response => {
                const post = response.data
                dispatch(getPostSuccess(post))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(getPostFailure(errorMessage))
            })
    };
};

export const postPostRequest = (id, likes) => {
    return (dispatch) => {
        dispatch(postPost())
        axios.post(`http://127.0.0.1:8000/api/post/${id}/`, {
            likes
        }).then(response => {
            if ( response.request.status === 200 ) {
                const postLike  = { likes: likes, alreadyLiked: 'Thanks!' }
                dispatch(postPostSuccess(postLike))
            } else if ( response.request.status === 210 ) {
                const postLike = { likes: likes, alreadyLiked: 'You already liked!' }
                dispatch(postPostSuccess(postLike))
            }
        }).catch(error => {
            const errorMessage = error.message
            dispatch(postPostFailure(errorMessage))
        })
    };
};