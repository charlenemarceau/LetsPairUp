import axios from "axios";

// pins
export const GET_PINS = "GET_PINS";
export const GET_ALL_PINS = "GET_PINS";
export const ADD_PIN = "ADD_PIN";
export const DELETE_PIN = "DELETE_PIN";

export const getPins = (num) => {
    return (dispatch) => {
        return axios ({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/pins/`
        })
        .then((res) => {
            const array = res.data.slice(0, num);
            dispatch({
                type: GET_PINS,
                payload: array
            })
            dispatch({
                type: GET_ALL_PINS,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
};

export const addPin = (data) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/pins/`, data)
        .catch((err) => console.log(err.response))
    };
};


export const deletePost = (pinId, userId) => {
    return (dispatch) => {
        return axios ({
            method:'delete',
            url: `${process.env.REACT_APP_API_URL}api/pins/${pinId}`
        })
        .then((res) => {
            dispatch({
                type: DELETE_PIN,
                payload: {
                    pinId, userId
                }
            })
        })
        .catch((err) => console.log(err));
    };
};

