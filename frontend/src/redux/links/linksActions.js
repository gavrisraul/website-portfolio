import axios from 'axios';
import { GET_LINKS, GET_LINKS_SUCCESS, GET_LINKS_FAILURE } from './linksTypes';

export const getLinks = ()  => {
    return {
        type: GET_LINKS,
    };
};

export const getLinksSuccess = links  => {
    return {
        type: GET_LINKS_SUCCESS,
        payload: {
            about: links[0],
            blog: links[1],
            portfolio: links[2],
            contact: links[3],
            destroy: links[4],
            github: links[5],
            linkedin: links[6],
            facebook: links[7],
            instagram: links[8],
            youtube: links[9],
            resume: links[10],
            mindmap: links[11],
            admin_login: links[12],
        },
    };
};

export const getLinksFailure = error  => {
    return {
        type: GET_LINKS_FAILURE,
        payload: error,
    };
};

export const getLinksRequest = () => {
    return (dispatch) => {
        dispatch(getLinks())
        axios.get('http://127.0.0.1:8000/api/links/')
            .then(response => {
                const links = response.data
                dispatch(getLinksSuccess(links))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(getLinksFailure(errorMessage))
            })
    };
};