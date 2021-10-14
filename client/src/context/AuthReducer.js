const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_STATE":
            return {
                user:null,
                isFetching:true,
                error:false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching:false,
                error:false,
            };
        case "LOGIN_FAILURE":
            return {
                user:null,
                isFetching:false,
                error: action.payload,
            };
        case "FOLLOW":
            return {
                //fetch the previous state
                ...state,
                // and update user's propreties
                user: {
                    ...state.user,
                    //update following by fetching precious state and adding the userId
                    following: [...state.user.following, action.payload],
                }
            };
        case "UNFOLLOW":
        return {
            //fetch the previous state
            ...state,
            // and update user's propreties
            user: {
                ...state.user,
                //update following by filtering precious state and only removing/unfollowing the userId
                following: state.user.following.filter((following) => following !== action.payload),
            }
        };
        default:
            return state;
    }
};

export default AuthReducer;
