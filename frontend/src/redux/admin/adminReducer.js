import {GET_POSTS_ADMIN , GET_POSTS_SUCCESS_ADMIN, GET_POSTS_FAILURE_ADMIN } from './adminTypes';
import {POST_POSTS_ADMIN , POST_POSTS_SUCCESS_ADMIN, POST_POSTS_FAILURE_ADMIN } from './adminTypes';

import {GET_PORTFOLIO_ADMIN , GET_PORTFOLIO_SUCCESS_ADMIN, GET_PORTFOLIO_FAILURE_ADMIN } from './adminTypes';
import {POST_PORTFOLIO_ADMIN , POST_PORTFOLIO_SUCCESS_ADMIN, POST_PORTFOLIO_FAILURE_ADMIN } from './adminTypes';

import {GET_EMAIL_ADMIN , GET_EMAIL_SUCCESS_ADMIN, GET_EMAIL_FAILURE_ADMIN } from './adminTypes';
import {POST_EMAIL_ADMIN , POST_EMAIL_SUCCESS_ADMIN, POST_EMAIL_FAILURE_ADMIN } from './adminTypes';

const initialState = {
    posts: [],
    portfolio: [],
    email: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_ADMIN: return {
            ...state,
            posts: { success: 1 },
        };
        case GET_POSTS_SUCCESS_ADMIN: return {
            ...state,
            posts: action.payload,
            error: '',
        };
        case GET_POSTS_FAILURE_ADMIN: return {
            ...state,
            posts: [],
            error: action.payload,
        };
        case GET_PORTFOLIO_ADMIN: return {
            ...state,
            portfolio: { success: 1 },
        };
        case GET_PORTFOLIO_SUCCESS_ADMIN: return {
            ...state,
            portfolio: action.payload,
            error: '',
        };
        case GET_PORTFOLIO_FAILURE_ADMIN: return {
            ...state,
            portfolio: [],
            error: action.payload,
        };
        case GET_EMAIL_ADMIN: return {
            ...state,
            email: { success: 1 },
        };
        case GET_EMAIL_SUCCESS_ADMIN: return {
            ...state,
            email: action.payload,
            error: '',
        };
        case GET_EMAIL_FAILURE_ADMIN: return {
            ...state,
            email: [],
            error: action.payload,
        };
        default: return state;

    }
};

export default adminReducer;