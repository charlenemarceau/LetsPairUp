import React, {useRef, useState } from 'react';
import "./share.css";
import { LocationOnOutlined, PermMediaOutlined, CancelOutlined} from '@material-ui/icons';
// import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const {user} = useContext(AuthContext);
    const message = useRef();
    const [file, setFile] = useState(null);

    // const cancelPost = () => {
    //   };

    const submitHandler = async (e) => {
        e.preventDefault();
        // const newPost = {
        //   userId: user._id,
        //   message: message.current.value,
        // };
        // if (file) {
        //   const data = new FormData();
        //   const fileName = Date.now() + file.name;
        //   data.append("name", fileName);
        //   data.append("file", file);
        //   newPost.image = fileName;
        //   console.log(newPost);
        //   try {
        //     await axios.post("/upload", data);
        //   } catch (err) {
              
        //   }
        // }
        // try {
        //   await axios.post("/posts", newPost);
        //   window.location.reload();
        // } catch (err) {}
    };


    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    {/* <img className='shareProfileImg' src={user.avatar ? PF+user.avatar : PF + "random-user.jpg"} alt="" />
                    <input placeholder={"Quoi de neuf " + user.username + " ?"} className='shareInput' ref={message}/> */}
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        {/*create pseudo url to visualize img*/}
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        < CancelOutlined className="shareCancelImg" onClick={() => setFile("")}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMediaOutlined className='shareIcon'/>
                            <span className="shareOptionText">Image ou vidéo</span>
                            <input type="file" name="file" id="file" accept=".jpg, .png, .jpeg" style={{display:"none"}}onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <LocationOnOutlined className='shareIcon'/>
                            <span className="shareOptionText">Localisation</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>Envoyez</button>
                </form>
            </div>
        </div>
    )
}

export default Share
