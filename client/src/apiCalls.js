import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START"});
    try {
        // post request and wait for response
        const res = await axios
        .post("auth/login", userCredential);
        // if successful, send response login_success
        dispatch( { type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
        // if error, send response error
        dispatch( { type: "LOGIN_FAILURE", payload: err});
    }
};