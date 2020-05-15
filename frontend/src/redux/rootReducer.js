import { combineReducers } from 'redux';
import heroReducer from './hero/heroReducer';
import linksReducer from './links/linksReducer';
import postReducer from './post/postReducer';
import postsReducer from './posts/postsReducer';
import sendEmailReducer from './sendEmail/sendEmailReducer';
import loginReducer from './login/loginReducer';
import adminReducer from './admin/adminReducer';

const rootReducer = combineReducers({
    heroReducer,
    linksReducer,
    postReducer,
    postsReducer,
    sendEmailReducer,
    loginReducer,
    adminReducer
});

export default rootReducer;