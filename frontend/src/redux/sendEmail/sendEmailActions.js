import portfolioApi from '../../services/portfolioApi';

import { GET_SEND_EMAIL, GET_SEND_EMAIL_SUCCESS, GET_SEND_EMAIL_FAILURE } from './sendEmailTypes';
import { POST_SEND_EMAIL, POST_SEND_EMAIL_SUCCESS, POST_SEND_EMAIL_FAILURE } from './sendEmailTypes';
import { GET_CLIENT_IP, GET_CLIENT_IP_SUCCESS, GET_CLIENT_IP_FAILURE } from './sendEmailTypes';

export const getSendEmail = ()  => {
    return {
        type: GET_SEND_EMAIL,
    };
};

export const getSendEmailSuccess = sendEmail  => {
    return {
        type: GET_SEND_EMAIL_SUCCESS,
        payload: sendEmail,
    };
};

export const getSendEmailFailure = error  => {
    return {
        type: GET_SEND_EMAIL_FAILURE,
        payload: error,
    };
};

export const postSendEmail = ()  => {
    return {
        type: POST_SEND_EMAIL,
    };
};

export const postSendEmailSuccess = sendEmailPost  => {
    return {
        type: POST_SEND_EMAIL_SUCCESS,
        payload: sendEmailPost,
    };
};

export const postSendEmailFailure = error  => {
    return {
        type: POST_SEND_EMAIL_FAILURE,
        payload: error,
    };
};

export const getClientIp = ()  => {
    return {
        type: GET_CLIENT_IP,
    };
};

export const getClientIpSuccess = clientIp  => {
    return {
        type: GET_CLIENT_IP_SUCCESS,
        payload: clientIp,
    };
};

export const getClientIpFailure = error  => {
    return {
        type: GET_CLIENT_IP_FAILURE,
        payload: error,
    };
};

export const getSendEmailRequest = () => {
    return (dispatch) => {
        dispatch(getSendEmail())
        portfolioApi.getSendEmail()
            .then(response => {
                let emailConfig = JSON.parse(response)
                dispatch(getSendEmailSuccess(emailConfig))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(getSendEmailFailure(errorMessage))
            })
    };
};

export const getClientIpRequest = () => {
    return (dispatch) => {
        dispatch(getClientIp())
        portfolioApi.getClientIp()
            .then(response => {
                let client_ip = response.ip
                dispatch(getClientIpSuccess(client_ip))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(getClientIpFailure(errorMessage))
            })
    };
};

export const postSendEmailRequest = (name, email, message, subject, client_ip, count) => {
    return (dispatch) => {
        dispatch(postSendEmail())
        portfolioApi.postSendEmail({name, email, message, subject, client_ip, count})
            .then(response => {
                const email_config = {
                    name: name,
                    email: email,
                    message: message,
                    subject: subject,
                    client_ip: client_ip,
                    count: count
                }
                dispatch(postSendEmailSuccess(email_config))
            }).catch(error => {
                const errorMessage = error.message
                dispatch(postSendEmailFailure(errorMessage))
            })
    };
};