import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// initial state
const INITIAL_STATE = {
    // not login at the beginning
    user: {
        _id:"6165b032ed08218361a5464d",
        username:"Charlène",
        email:"charlenemarceau@hotmail.fr",
        avatar:"avatar.jpeg",
        age:26,
        city:"San Francisco",
        from:"France",
        followers: [],
        following:[],
    },
    // decide the beginning and ending. So false first
    isFetching: false,
    // no error at the beginning
    error: false
};

// set the context with the iniatial state
export const AuthContext = createContext(INITIAL_STATE);

// creating a wrapper to be able to use the context on the entire app
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        // children is our app and i am sharing all the values with the app
        <AuthContext.Provider value={{ 
            user:state.user,
            isFetching:state.isFetching,
            error: state.error,
            dispatch,
            }}>
        {children} 
        </AuthContext.Provider>
    )
}