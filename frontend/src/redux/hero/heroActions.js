import portfolioApi from '../../services/portfolioApi';

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
        portfolioApi.getHero()
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