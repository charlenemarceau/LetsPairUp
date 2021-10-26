import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../../Utils';
import FollowHandler from '../followHandler/FollowHandler';
import DeleteComment from './DeleteComment';


function Comments({post}) {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.pseudo))
            .then(() => dispatch(getPosts()))
            .then(() => setText(''));
        }
    }

    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    <div className={comment.commenterId === userData._id ? 
                        "comment-container client" : "comment-container"} key={comment._id}>
                        <div className="left-part">
                            <img src={ !isEmpty(usersData[0]) && usersData
                              .map((user) => {
                                if (user._id === comment.commenterId) return user.avatar;
                                else return null;
                              })
                              .join("")
                            }
                            alt="commenter-pic"/>  
                            <div className="pseudo">
                                <h3>{comment.commenterPseudo}</h3>
                                { comment.commenterId !== userData._id && (
                                    < FollowHandler idToFollow={comment.commenterId} type={'card'} />
                                )}
                            </div>
                            <span className='dateComment'>{timestampParser(comment.timestamp)}</span>
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                            </div>
                            <p className='textComment'>{comment.text}</p>
                            <DeleteComment comment={comment} postId={post._id } className="delete-comment-btn"/>
                        </div>

                    </div>
                );
            })}
            {userData._id && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Laisser un commentaire" className='comment-textarea'/>
                    <br/>
                    <input type="submit" value="Envoyer" className='send-comment-btn'/>
                </form>
            )}

        </div>
    )
}

export default Comments;
