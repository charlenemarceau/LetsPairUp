import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FavoriteOutlined, MoreVert } from '@material-ui/icons';
import axios from "axios";
import './post.css';
import { format } from "timeago.js";
// import { AuthContext } from "../../context/AuthContext";

function Post( {post} ) {
    const [user, setUser] = useState({});
    const [like, setLike] = useState(post.likes?.length);
    const [isLiked, setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const {user:currentUser} = useContext(AuthContext);

    // useEffect(() => {
    //     setIsLiked(post.likes?.includes(currentUser._id));
    //   }, [currentUser._id, post.likes]);

    // useEffect (() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`/users?userId=${post.userId}`);
    //         setUser(res.data)
    //     };
    //     fetchUser();
    // }, [ post.userId])

    // const likeHandler = () => {
    //     try {
    //         axios.put('posts/'+post._id+"/like", {userId: currentUser._id});
    //     }catch(err) {
            
    //     }
    //     // if already like vs if not liked before
    //     setLike(isLiked ? like-1 : like+1) 
    //     setIsLiked(!isLiked)
    // }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.avatar ? PF+user.avatar : PF + "random-user.jpg"} alt="" className='postProfileImg' />
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.message}
                    </span>
                    <img className='postImg' src={PF+post.image} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        < FavoriteOutlined className="likeIcon" />
                        {/* onClick={likeHandler} */}
                        <span className="postLikeCounter">{like} Au pairs ont aimé</span>
                    </div>
                    <div className="postBottomRight">
                    <span className="postCommentText">{post.comments ? post.comments.length : 0}{" "}
                    commentaire
                    {post.comments && post.comments.length > 1 ? "s" : null}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
