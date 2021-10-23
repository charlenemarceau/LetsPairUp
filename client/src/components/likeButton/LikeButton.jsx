import React, { useState, useEffect, useContext } from 'react';
import { UidContext } from '../AppContext';
import { FavoriteBorderOutlined, Favorite} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';


function LikeButton( {post}) {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext); // get the user id to see if user already liked the post
    const dispatch = useDispatch()

    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true)
    }

    const unLike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    }

    useEffect(() => {
        if (post.likers?.includes(uid)) {
            setLiked(true)
        } else {
            setLiked(false);
        }
    }, [uid, post.likers, liked]);

    return (
        <div className="like-container">
            {uid && liked === false && ( // if connected and if post is not liked
                < FavoriteBorderOutlined onClick={like}  className="likeButton"/>
            )}
            {uid && liked && ( // if connected and if post liked
                < Favorite onClick={unLike}  className="likeButton"/>
            )}
            <span className='likesNumber'>{post.likes?.length}</span>
        </div>
    )
}

export default LikeButton;
