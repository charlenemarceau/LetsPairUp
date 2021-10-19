import React, { useContext, useRef, useState } from 'react';
import "./ask.css";
import { LocationOnOutlined, PermMediaOutlined, CancelOutlined} from '@material-ui/icons';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const question = useRef();

    // const cancelPost = () => {
    //   };

    const submitHandler = async (e) => {
        e.preventDefault();
        const newQuestion = {
          userId: user._id,
          ask: question.current.value,
        };
        try {
          await axios.post("/posts", newQuestion);
          window.location.reload();
        } catch (err) {}
    };


    return (
        <div className="ask">
            <div className="askWrapper">
                <div className="askTop">
                    <img className='askProfileImg' src={user.avatar ? PF+user.avatar : PF + "random-user.jpg"} alt="" />
                    <input placeholder={"Une question " + user.username + " ?"} className='askInput' ref={question}/>
                </div>
                <hr className="askHr" />
                <form className="askBottom" onSubmit={submitHandler}>
                    <div className="askOptions">
                    </div>
                    <button className="askButton" type='submit'>Envoyez</button>
                </form>
            </div>
        </div>
    )
}

export default Share
