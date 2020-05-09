import { GET_LINKS, GET_LINKS_SUCCESS, GET_LINKS_FAILURE } from './linksTypes';

const initialState = {
    links: [],
    error: '',
};

const linksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LINKS: 
        return {
            ...state,
            links: { success: 1, loaded: false},
        };
        case GET_LINKS_SUCCESS:
        return {
            ...state,
            links: {...action.payload, loaded: true},
            error: '',
        };
        case GET_LINKS_FAILURE: return {
            ...state,
            links: {},
            error: {...action.payload, loaded:false},
        };
        default: return state;
    }
};

export default linksReducer;