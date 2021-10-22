import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FavoriteOutlined, MoreVert } from '@material-ui/icons';
import './post.css';
import { useSelector } from 'react-redux';
import { dateParserPost, isEmpty } from '../../Utils';
import FollowHandler from '../followHandler/FollowHandler';
import LikeButton from '../likeButton/LikeButton';

function Post( {post} ) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer) // get users data
    const userData = useSelector((state) => state.userReducer) // get user data

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false) // if usersData is not empty, no more loading spinner
    }, [usersData])

    return (
        <>
        <div className="post">
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (

            <>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${userData.username}`}>
                            <img src={!isEmpty(usersData[0]) && usersData
                            .map((user) => {
                                if (user._id === post.userId) {
                                    return user.avatar ? PF+user.avatar : PF + "random-user.jpg"
                                }
                                else return null
                            }).join("")} alt="" className='postProfileImg'/>
                        </Link>
                        <span className="postUserName">
                            <h3>
                            {!isEmpty(usersData[0]) && usersData
                                .map((user) => {
                                    if (user._id === post.userId) return user.username;
                                    else return null;
                            }).join("") }
                            </h3>
                            {/** if current user is the poster user, won't have the follow/unfollow suggestion */}
                            {post.userId !== userData._id && (
                            <FollowHandler idToFollow={post.userId} type={"card"}/>
                            )}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <span className="postDate">{dateParserPost(post.createdAt)}</span>
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.message}
                    </span>
                    {post.image && <img className='postImg' src={PF+post.image} alt="" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        < FavoriteOutlined className="likeIcon" />
                        <LikeButton post={post}/>
                    </div>
                    <div className="postBottomRight">
                    <span className="postCommentText">
                        {post.comments ? post.comments.length : 0}{" "}
                        commentaire
                        {post.comments && post.comments.length > 1 ? "s" : null}</span>
                    </div>
                </div>
            </div>
            </>
            )}
        </div>
        </>
    )
}

export default Post
