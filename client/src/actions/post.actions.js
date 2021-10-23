import axios from "axios";


//posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";


// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios ({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/posts/`
        })
        .then((res) => {
            const array = res.data.slice(0, num);
            dispatch({
                type: GET_POSTS,
                payload: array
            })
        })
        .catch((err) => console.log(err))
    }
}

export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method:'put', 
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}/like`, 
            data: { userId}
        })
        .then((res) => {
            dispatch ({
                type: LIKE_POST, 
                payload: {userId}
            })
        })
        .catch((err) => console.log(err))
    };
};

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method:'put', 
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}/unlike`, 
            data: { userId}
        })
        .then((res) => {
            dispatch ({
                type: UNLIKE_POST, 
                payload: {userId}
            })
        })
        .catch((err) => console.log(err))
    };
};
export const addPost = (data) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/posts/`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ 
                type: GET_POST_ERRORS,
                payload: res.data.errors });
          } else {
            dispatch({ 
                type: GET_POST_ERRORS,
                payload: "" });
          }
        })
        .catch((err) => console.log(err.response))
    };
  };


export const updatePost = (postId, message, posterId) => {
    return (dispatch) => {
        return axios ({
            method:'put',
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
            data: {message, posterId}
        })
        .then((res) => {
            dispatch({
                type: UPDATE_POST,
                payload: {
                    message, postId, posterId
                }
            })
        })
        .catch((err) => console.log(err));
    };
};

export const deletePost = (postId, posterId) => {
    return (dispatch) => {
        return axios ({
            method:'delete',
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`
        })
        .then((res) => {
            dispatch({
                type: DELETE_POST,
                payload: {
                    postId, posterId
                }
            })
        })
        .catch((err) => console.log(err));
    };
};

// comments

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios ({
            method:'post',
            url: `${process.env.REACT_APP_API_URL}api/posts/comment-post/${postId}`,
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
                    postId
                }
            })
        })
        .catch((err) => console.log(err));
    };
}

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios ({
            method:'delete',
            url: `${process.env.REACT_APP_API_URL}api/posts/delete-comment-post/${postId}`,
            data: {
                commentId
            },
        })
        .then((res) => {
            dispatch({
                type: DELETE_COMMENT,
                payload: {
                    postId,
                    commentId
                }
            })
        })
        .catch((err) => console.log(err));
    };
}
