import React, { useState, useEffect, useContext } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FavoriteBorderOutlined } from '@material-ui/icons'


function LikeButton( {post}) {

    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext); // get the user id to see if user already liked the post

    useEffect(() => {
        if (post.likers?.includes(uid)) {
            setLiked(true)
        }
    }, [uid, post.likers, liked])
    return (
        <div className="like-container">
            {uid === null &&
                <Popup trigger={<FavoriteBorderOutlined className='like'/>} position={['bottom center', 'bottom left', 'bottom right']} closeOnDocumentClick>
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup>
            }
        </div>
    )
}

export default LikeButton;
