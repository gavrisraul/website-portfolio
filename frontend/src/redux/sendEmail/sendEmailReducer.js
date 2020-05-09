import { GET_SEND_EMAIL, GET_SEND_EMAIL_SUCCESS, GET_SEND_EMAIL_FAILURE } from './sendEmailTypes';
import { POST_SEND_EMAIL, POST_SEND_EMAIL_SUCCESS, POST_SEND_EMAIL_FAILURE } from './sendEmailTypes';
import { GET_CLIENT_IP, GET_CLIENT_IP_SUCCESS, GET_CLIENT_IP_FAILURE } from './sendEmailTypes';

const initialState = {
    name: '',
    email: '',
    message: '',
    subject: '',
    client_ip: '',
    count: 0,
    error: '',
};

const sendEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEND_EMAIL: return {
            ...state,
            sendEmail: { success: 1, loaded: false },
        };
        case GET_SEND_EMAIL_SUCCESS: return {
            ...state,
            sendEmail: { email_config: action.payload, loaded: true },
            error: '',
        };
        case GET_SEND_EMAIL_FAILURE: return {
            ...state,
            sendEmail: {},
            error: { ...action.payload, loaded: false },
        };
        case POST_SEND_EMAIL: return {
            ...state,
            sendEmailPost: { email_config: [], success: 1 },
        }
        case POST_SEND_EMAIL_SUCCESS: return {
            ...state,
            sendEmailPost: action.payload,
            error: '',
        }
        case POST_SEND_EMAIL_FAILURE: return {
            ...state,
            sendEmailPost: {},
            error: action.payload,
        }
        case GET_CLIENT_IP: return {
            ...state,
            client: { success: 1, loaded: false },
        };
        case GET_CLIENT_IP_SUCCESS: return {
            ...state,
            client: { clientIp: action.payload, loaded: true },
            error: '',
        };
        case GET_CLIENT_IP_FAILURE: return {
            ...state,
            client: {},
            error: { ...action.payload, loaded: false },
        };
        default: return state;
    }
};

export default sendEmailReducer;