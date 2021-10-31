import axios from "axios";

// posts
export const GET_QUESTIONS = "GET_QUESTIONS";
export const GET_ALL_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getQuestions = (num) => {
    return (dispatch) => {
        return axios ({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/questions/`
        })
        .then((res) => {
            const array = res.data.slice(0, num);
            dispatch({
                type: GET_QUESTIONS,
                payload: array
            })
            dispatch({
                type: GET_ALL_QUESTIONS,
                payload: res.data
            })
        })
        .catch((err) => console.log(err))
    }
};


export const addQuestion = (data) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/questions/`, data)
        .then((res) => {
            dispatch({ 
                type: GET_QUESTIONS,
                payload: "" });
        })
        .catch((err) => console.log(err.response))
    };
};


export const updateQuestion = (questionId, question, userId) => {
    return (dispatch) => {
        return axios ({
            method:'put',
            url: `${process.env.REACT_APP_API_URL}api/questions/${questionId}`,
            data: {question, userId}
        })
        .then((res) => {
            dispatch({
                type: UPDATE_QUESTION,
                payload: {
                    question, questionId, userId
                }
            })
        })
        .catch((err) => console.log(err));
    };
};

export const deleteQuestion = (questionId, userId) => {
    return (dispatch) => {
        return axios ({
            method:'delete',
            url: `${process.env.REACT_APP_API_URL}api/questions/${questionId}`
        })
        .then((res) => {
            dispatch({
                type: DELETE_QUESTION,
                payload: {
                    questionId, userId
                }
            })
        })
        .catch((err) => console.log(err));
    };
};

// comments

export const addComment = (questionId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios ({
            method:'post',
            url: `${process.env.REACT_APP_API_URL}api/questions/answer-question/${questionId}`,
            data: {
                commenterId,
                commenterPseudo,
                text,
            },
        })
        .then((res) => {
            dispatch({
                type: ADD_COMMENT,
                payload: {
                    questionId
                }
            })
        })
        .catch((err) => console.log(err));
    };
}

export const deleteComment = (questionId, commentId) => {
    return (dispatch) => {
        return axios ({
            method:'delete',
            url: `${process.env.REACT_APP_API_URL}api/questions/delete-answer/${questionId}`,
            data: {
                commentId
            },
        })
        .then((res) => {
            dispatch({
                type: DELETE_COMMENT,
                payload: {
                    questionId,
                    commentId
                }
            })
        })
        .catch((err) => console.log(err));
    };
}
