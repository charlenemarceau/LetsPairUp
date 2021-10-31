import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import usersReducer from "./users-reducer";
import postReducer from './post-reducer';
import errorReducer from './error-reducer';
import allPostsReducer from './allPosts-reducer';
import allQuestionsReducer from './allQuestions-reducer';
import trendingReducer from './trending-reducer';
import pinReducer from './pin-reducer';
import questionReducer from './question-reducer';

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer,
    allPostsReducer,
    trendingReducer,
    pinReducer,
    questionReducer,
    allQuestionsReducer,
});