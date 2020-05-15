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