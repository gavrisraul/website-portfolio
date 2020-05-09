import axios from 'axios';
import { GET_HERO, GET_HERO_SUCCESS, GET_HERO_FAILURE } from './heroTypes';

export const getHero = ()  => {
    return {
        type: GET_HERO,
    };
};

export const getHeroSuccess = hero  => {
    return {
        type: GET_HERO_SUCCESS,
        payload: hero,
    };
};

export const getHeroFailure = error  => {
    return {
        type: GET_HERO_FAILURE,
        payload: error,
    };
};

export const getHeroRequest = () => {
    return (dispatch) => {
        dispatch(getHero())
        axios.get('http://127.0.0.1:8000/api/hero/')
            .then(response => {
                const hero = response.data[0]
                dispatch(getHeroSuccess(hero))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(getHeroFailure(errorMessage))
            })
    };
};