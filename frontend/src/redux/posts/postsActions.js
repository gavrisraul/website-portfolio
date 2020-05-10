import portfolioApi from '../../services/portfolioApi';

import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from './postsTypes';

export const getPosts = ()  => {
    return {
        type: GET_POSTS,
    };
};

export const getPostsSuccess = posts  => {
    return {
        type: GET_POSTS_SUCCESS,
        payload: posts,
    };
};

export const getPostsFailure = error  => {
    return {
        type: GET_POSTS_FAILURE,
        payload: error,
    };
};

export const getPostsRequest = () => {
    return (dispatch) => {
        dispatch(getPosts())
        portfolioApi.getPosts()
            .then(response => {
                const posts = response
                dispatch(getPostsSuccess(posts))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(getPostsFailure(errorMessage))
            })
    };
};