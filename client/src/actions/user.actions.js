import axios from 'axios';

export const GET_USER = "GET_USER";
export const GET_A_USER = "GET_USER";
export const DELETE_USER = "DELETE_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

//errors

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => { // to fetch user
    return (dispatch) => {
        return axios
         .get(`${process.env.REACT_APP_API_URL}api/users?userId=${uid}`) // get to fetch user data
         .then((res)=> {
             dispatch({ type : GET_USER, payload: res.data }); // datas will go to reducer
         })
         .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, id) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/upload`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_USER_ERRORS, payload: "" });
            return axios
              .get(`${process.env.REACT_APP_API_URL}api/users/${id}`)
              .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.avatar });
              });
          }
        })
        .catch((err) => console.log(err));
    };
  };

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios
        .put(`${process.env.REACT_APP_API_URL}api/users/` + userId, {
            userId, bio
        })
        .then((res) => {
            dispatch({ type : UPDATE_BIO, payload: res.data.bio }); // datas will go to reducer
        })
        .catch((err) => console.log(err))
    }
}

export const followUser = (userId, idToFollow) => {
    return (dispatch) => {
        return axios({
            method:'patch', 
            url: `${process.env.REACT_APP_API_URL}api/users/follow/` + idToFollow,
            data: { userId }
        })
        .then((res) => {
            dispatch ({
                type: FOLLOW_USER, 
                payload: {userId}
            })
        })
        .catch((err) => console.log(err))
    }
}

export const unfollowUser = (userId, idToUnfollow) => {
    return (dispatch) => {
        return axios({
            method:'patch', 
            url: `${process.env.REACT_APP_API_URL}api/users/unfollow/` + idToUnfollow, 
            data: { userId, idToUnfollow}
        })
        .then((res) => {
            dispatch ({
                type: UNFOLLOW_USER, 
                payload: {userId}
            })
        })
        .catch((err) => console.log(err))
    }
}

export const deleteUser = (username) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/users/profil?username=` + username, 
            data: { username }
        })
        .then((res) => {
            dispatch ({
                type: DELETE_USER,
                payload: {username}
            })
        })
        .catch((err) => console.log(err));
    }
}