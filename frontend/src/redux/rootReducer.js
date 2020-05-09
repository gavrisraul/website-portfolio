import { combineReducers } from 'redux';
import heroReducer from './hero/heroReducer';
import linksReducer from './links/linksReducer';
import postReducer from './post/postReducer';
import postsReducer from './posts/postsReducer';
import sendEmailReducer from './sendEmail/sendEmailReducer';

const rootReducer = combineReducers({
    heroReducer,
    linksReducer,
    postReducer,
    postsReducer,
    sendEmailReducer
});

export default rootReducer;