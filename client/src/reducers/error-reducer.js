import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = {
    userError: [],
    postError: []
}

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        // if errors in post, send post errors
        case GET_POST_ERRORS:
            return {
                postError: action.payload,
                userError:[]
            }
        // if users errors, send user errors
        case GET_USER_ERRORS:
            return {
                userError: action.payload,
                postError: []
            }
        default:
            return state;
    }
}