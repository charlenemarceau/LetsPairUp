import React, {useState, useEffect} from 'react';
import { MoreVert, Edit, Comment } from '@material-ui/icons';
import './post.css';
import { useSelector, useDispatch } from 'react-redux';
import { dateParserPost, isEmpty } from '../../Utils';
import FollowHandler from '../followHandler/FollowHandler';
import LikeButton from '../likeButton/LikeButton';
import { updatePost } from '../../actions/post.actions';
import DeletePost from './DeletePost';
import Comments from "./Comment";

function Post( {post} ) {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [moreOptions, setMoreOptions] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer) // get users data
    const userData = useSelector((state) => state.userReducer) // get user data
    const dispatch = useDispatch()

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false) // if usersData is not empty, no more loading spinner
    }, [usersData])

    const handleMenu = () => {
        setMoreOptions(true)
    }
    const handleMenuClose = () => {
        setMoreOptions(false);
    }

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);
    }

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
                        <img src={!isEmpty(usersData[0]) && usersData
                        .map((user) => {
                            if (user._id === post.posterId) {
                                return user.avatar
                            }
                            else return null
                        }).join("")} alt="" className='postProfileImg'/>
                        <span className="postUserName">
                            <h3>
                            {!isEmpty(usersData[0]) && usersData
                                .map((user) => {
                                    if (user._id === post.posterId) return user.username;
                                    else return null;
                            }).join("") }
                            </h3>
                            {/** if current user is the poster user, won't have the follow/unfollow suggestion */}
                            {post.posterId !== userData._id && (
                            <FollowHandler idToFollow={post.posterId} type={"card"}/>
                            )}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <span className="postDate">{dateParserPost(post.createdAt)}</span>
                        {userData._id === post.posterId && (
                            <>
                                { moreOptions && (
                                    <>
                                    <div className="moreOptionsContainer">
                                    <div onClick={handleMenuClose} className="moreOptions-close">&#10006;</div>
                                    <div className="moreOptions">
                                        < Edit onClick={() => setIsUpdated(!isUpdated)}/>
                                        < DeletePost id={post._id}/>
                                    </div>
                                    </div>
                                    </>
                                )}
                                { !moreOptions && (
                                    <div className="moreOptionsClose">
                                        <MoreVert onClick={handleMenu} className="moreOptions-button"/>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="postCenter">
                    {isUpdated === false && <span className="postText">{post?.message}</span>}
                    {isUpdated && (
                        <div className="update-post">
                            <textarea defaultValue={post?.message} onChange={((e) => setTextUpdate(e.target.value))}/>
                            {/* <div className="button-container"> */}
                                <button className="btn" onClick={updateItem}>
                                    Valider modification
                                </button>
                            {/* </div> */}
                        </div>
                    )}
                    
                    {post.image && <img className='postImg' src={post.image} alt="" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <LikeButton post={post}/>
                    </div>
                    <div className="postBottomRight">
                    <span className="postCommentText">
                        < Comment onClick={() => setShowComments(!showComments)} className="CommentButton" />
                    </span>
                    <div className="CommentsContainer">
                        {showComments && (
                            <>
                            <div onClick={() => setShowComments(!showComments)}>&#10006;</div>
                            <Comments post={post} /></>
                        )}
                    </div>
                        {/* // {post.comments ? post.comments.length : 0}{" "}
                        // commentaire
                        // {post.comments && post.comments.length > 1 ? "s" : null} */}
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
