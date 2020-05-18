import portfolioApi from '../../services/portfolioApi';

import {GET_POSTS_ADMIN , GET_POSTS_SUCCESS_ADMIN, GET_POSTS_FAILURE_ADMIN } from './adminTypes';
import {POST_POSTS_ADMIN , POST_POSTS_SUCCESS_ADMIN, POST_POSTS_FAILURE_ADMIN } from './adminTypes';

import {GET_PORTFOLIO_ADMIN , GET_PORTFOLIO_SUCCESS_ADMIN, GET_PORTFOLIO_FAILURE_ADMIN } from './adminTypes';
import {POST_PORTFOLIO_ADMIN , POST_PORTFOLIO_SUCCESS_ADMIN, POST_PORTFOLIO_FAILURE_ADMIN } from './adminTypes';

import {GET_EMAIL_ADMIN , GET_EMAIL_SUCCESS_ADMIN, GET_EMAIL_FAILURE_ADMIN } from './adminTypes';
import {POST_EMAIL_ADMIN , POST_EMAIL_SUCCESS_ADMIN, POST_EMAIL_FAILURE_ADMIN } from './adminTypes';


export const getPostsAdmin = ()  => {
    return {
        type: GET_POSTS_ADMIN,
    };
};

export const getPostsAdminSuccess = posts  => {
    return {
        type: GET_POSTS_SUCCESS_ADMIN,
        payload: posts,
    };
};

export const getPostsAdminFailure = error  => {
    return {
        type: GET_POSTS_FAILURE_ADMIN,
        payload: error,
    };
};

export const getPostsAdminRequest = () => {
    return (dispatch) => {
        dispatch(getPostsAdminSuccess())
        portfolioApi.getPostsAdmin()
        .then(response => {
            const data = response.data;
            dispatch(getPostsAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(getPostsAdminFailure(errorMessage))
        })
    };  
};

export const getPortfolioAdmin = ()  => {
    return {
        type: GET_PORTFOLIO_ADMIN,
    };
};

export const getPortfolioAdminSuccess = portfolio  => {
    return {
        type: GET_PORTFOLIO_SUCCESS_ADMIN,
        payload: portfolio,
    };
};

export const getPortfolioAdminFailure = error  => {
    return {
        type: GET_PORTFOLIO_FAILURE_ADMIN,
        payload: error,
    };
};

export const getPortfolioAdminRequest = () => {
    return (dispatch) => {
        dispatch(getPortfolioAdminSuccess())
        portfolioApi.getPortfolioAdmin()
        .then(response => {
            const data = response.data;
            dispatch(getPortfolioAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(getPortfolioAdminFailure(errorMessage))
        })
    };  
};

export const getEmailAdmin = ()  => {
    return {
        type: GET_EMAIL_ADMIN,
    };
};

export const getEmailAdminSuccess = email  => {
    return {
        type: GET_EMAIL_SUCCESS_ADMIN,
        payload: email,
    };
};

export const getEmailAdminFailure = error  => {
    return {
        type: GET_EMAIL_FAILURE_ADMIN,
        payload: error,
    };
};

export const getEmailAdminRequest = () => {
    return (dispatch) => {
        dispatch(getEmailAdminSuccess())
        portfolioApi.getEmailAdmin()
        .then(response => {
            const data = response.data;
            dispatch(getEmailAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(getEmailAdminFailure(errorMessage))
        })
    };  
};

export const postPostsAdmin = ()  => {
    return {
        type: POST_POSTS_ADMIN,
    };
};

export const postPostsAdminSuccess = posts  => {
    return {
        type: POST_POSTS_SUCCESS_ADMIN,
        payload: posts,
    };
};

export const postPostsAdminFailure = error  => {
    return {
        type: POST_POSTS_FAILURE_ADMIN,
        payload: error,
    };
};

export const postPostsAdminDeleteRequest = (post_id, operation) => {
    return (dispatch) => {
        dispatch(postPostsAdminSuccess())
        portfolioApi.postPostsAdmin({
            post_id: post_id,
            operation: operation,
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
        })
        .then(response => {
            const data = response.data;
            dispatch(postPostsAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(postPostsAdminFailure(errorMessage))
        })
    };  
};

export const postPostsAdminUpdateRequest = (post_id, operation, title, text, image, date, likes) => {
    return (dispatch) => {
        dispatch(postPostsAdminSuccess())
        portfolioApi.postPostsAdmin({
            post_id: post_id,
            operation: operation,
            title: title,
            text: text,
            image: image,
            date: date,
            likes: likes,
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
        })
        .then(response => {
            const data = response.data;
            dispatch(postPostsAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(postPostsAdminFailure(errorMessage))
        })
    };  
};

export const postPostsAdminAddRequest = (post_id, operation, title, text, image, date, likes) => {
    return (dispatch) => {
        dispatch(postPostsAdminSuccess())
        portfolioApi.postPostsAdmin({
            post_id: post_id,
            operation: operation,
            title: title,
            text: text,
            image: image,
            date: date,
            likes: likes,
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
        })
        .then(response => {
            const data = response.data;
            dispatch(postPostsAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(postPostsAdminFailure(errorMessage))
        })
    };  
};

export const postPortfolioAdmin = ()  => {
    return {
        type: POST_PORTFOLIO_ADMIN,
    };
};

export const postPortfolioAdminSuccess = portfolio  => {
    return {
        type: POST_PORTFOLIO_SUCCESS_ADMIN,
        payload: portfolio,
    };
};

export const postPortfolioAdminFailure = error  => {
    return {
        type: POST_PORTFOLIO_FAILURE_ADMIN,
        payload: error,
    };
};

export const postPortfolioAdminDeleteRequest = (portfolio_id, operation) => {
    return (dispatch) => {
        dispatch(postPortfolioAdminSuccess())
        portfolioApi.postPortfolioAdmin({
            portfolio_id: portfolio_id,
            operation: operation,
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
        })
        .then(response => {
            const data = response.data;
            dispatch(postPortfolioAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(postPortfolioAdminFailure(errorMessage))
        })
    };  
};

export const postPortfolioAdminUpdateRequest = (portfolio_id, operation, name, portfolio_image, portfolio_description) => {
    return (dispatch) => {
        dispatch(postPortfolioAdminSuccess())
        portfolioApi.postPortfolioAdmin({
            portfolio_id: portfolio_id,
            operation: operation,
            name: name,
            image: portfolio_image,
            description: portfolio_description,
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
        })
        .then(response => {
            const data = response.data;
            dispatch(postPortfolioAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(postPortfolioAdminFailure(errorMessage))
        })
    };  
};

export const postPortfolioAdminAddRequest = (portfolio_id, operation, name, portfolio_image, portfolio_description) => {
    return (dispatch) => {
        dispatch(postPortfolioAdminSuccess())
        portfolioApi.postPortfolioAdmin({
            portfolio_id: portfolio_id,
            operation: operation,
            name: name,
            portfolio_image: portfolio_image,
            portfolio_description: portfolio_description,
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
        })
        .then(response => {
            const data = response.data;
            dispatch(postPortfolioAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(postPortfolioAdminFailure(errorMessage))
        })
    };  
};

export const postEmailAdmin = ()  => {
    return {
        type: POST_EMAIL_ADMIN,
    };
};

export const postEmailAdminSuccess = email  => {
    return {
        type: POST_EMAIL_SUCCESS_ADMIN,
        payload: email,
    };
};

export const postEmailAdminFailure = error  => {
    return {
        type: POST_EMAIL_FAILURE_ADMIN,
        payload: error,
    };
};

export const postEmailAdminDeleteRequest = (email_id, operation) => {
    return (dispatch) => {
        dispatch(postEmailAdminSuccess())
        portfolioApi.postEmailAdmin({
            email_id: email_id,
            operation: operation,
        })
        .then(response => {
            const data = response.data;
            dispatch(postEmailAdminSuccess(data))
        }).catch(error => {
            const errorMessage = error.message
            dispatch(postEmailAdminFailure(errorMessage))
        })
    };  
};