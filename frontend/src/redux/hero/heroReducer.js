import { GET_HERO, GET_HERO_SUCCESS, GET_HERO_FAILURE } from './heroTypes';

const initialState = {
    hero: {},
    error: '',
};

const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HERO: 
        return {
            ...state,
            hero: { success: 1, loaded: false},
        };
        case GET_HERO_SUCCESS:
        return {
            ...state,
            hero: {...action.payload, loaded: true},
            error: '',
        };
        case GET_HERO_FAILURE: return {
            ...state,
            hero: {},
            error: {...action.payload, loaded: false},
        };
        default: return state;
    }
};

export default heroReducer;