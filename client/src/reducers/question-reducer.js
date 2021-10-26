import { DELETE_QUESTION, GET_QUESTIONS, UPDATE_QUESTION, DELETE_COMMENT } from "../actions/post.actions"
const initialState = {};

export default function postReducer(state = initialState, action) {
    switch(action.type) {
        case GET_QUESTIONS:
            return action.payload;
        case UPDATE_QUESTION:
            return state.map((question) => {
                if (question._id === action.payload.questionId) {
                    return {
                        ...question,
                        message: action.payload.message
                    };
                } else {
                    return question;
                }
            });
        case DELETE_QUESTION: 
            return state.filter((question) => question._id !== action.payload.questionId);
        case DELETE_COMMENT:
            return state.map((question) => {
                if (question._id === action.payload.questionId) {
                    return {
                        ...question,
                        comments: question.comments.filter((comment) => comment._id !== action.payload.commentId)
                    }
                } else {
                    return question;
                }
            });
        default:
            return state;
    }
}