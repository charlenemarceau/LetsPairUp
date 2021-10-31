import React, { useState, useEffect } from 'react';
import "./share.css";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../Utils";
import { PermMediaOutlined, CancelOutlined} from '@material-ui/icons';
import { addPost, getPosts } from "../../actions/post.actions";

function Share() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();

    const handlePost = async () => {
        if (message || postPicture) {
          const data = new FormData();
          data.append('posterId', userData._id);
          data.append('message', message);
          if (file) data.append("file", file);

          await dispatch(addPost(data));
          dispatch(getPosts());
          cancelPost();
        } else {
          alert("Veuillez entrer un message")
        }
      };
     
    const handlePicture = (e) => {
        // create a link for the image
      setPostPicture(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }; 

    const cancelPost = () => {
      setMessage("");
      setPostPicture("");
      setFile("");
    };

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    }, [userData])

    return (
        <div className="share">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
            <>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={userData.avatar} alt="" />
                    <input placeholder={"Quoi de neuf " + userData.username + " ?"} className='shareInput' 
                    onChange={((e) => setMessage(e.target.value))} value={message} />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        {/*create pseudo url to visualize img*/}
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        < CancelOutlined className="shareCancelImg" onClick={() => setFile("")}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={handlePost}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMediaOutlined className='shareIcon'/>
                            <span className="shareOptionText">Image ou vidéo</span>
                            <input type="file" name="file" id="file" accept=".jpg, .png, .jpeg" style={{display:"none"}}
                             onChange={(e) => handlePicture(e)}/>
                        </label>
                    </div>
                    { !isEmpty(error.format) && <p className='error'>{error.format}</p>}
                    { !isEmpty(error.maxSize) && <p className='error'>{error.maxSize}</p>}
                    { message || postPicture ? (
                        <button className="cancelButton" onClick={cancelPost}>Annuler</button>
                    ) : null }
                    <button className="shareButton" type='submit'>Envoyer</button>
                </form>
            </div>
            </>
            )}
        </div>
    )
}

export default Share
