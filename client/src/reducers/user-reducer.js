import { FOLLOW_USER, GET_USER, DELETE_USER, UNFOLLOW_USER, UPDATE_BIO, UPLOAD_PICTURE} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    // each case will change the iniatial state
    switch (action.type) {
        case GET_USER: 
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                avatar: action.payload,
            };
        case UPDATE_BIO:
            return {
                ...state, 
                bio: action.payload,
            };
        case DELETE_USER:
            return state.filter((user) => user.username !== action.payload.username)
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToUnfollow),
            }
        default:
            return state;
    }
}