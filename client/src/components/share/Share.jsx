import React from 'react';
import "./share.css";
import { LocationOnOutlined, PermMediaOutlined } from '@material-ui/icons';

function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src="/assets/random-user.jpg" alt="" />
                    <input placeholder="Quoi de neuf Maya ?" className='shareInput' />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMediaOutlined className='shareIcon'/>
                            <span className="shareOptionText">Image ou vidéo</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnOutlined className='shareIcon'/>
                            <span className="shareOptionText">Localisation</span>
                        </div>
                    </div>
                    <button className="shareButton">Envoyez</button>
                </div>
            </div>
        </div>
    )
}

export default Share
