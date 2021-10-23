import React, {useState, useEffect, useContext} from 'react';
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from '../../actions/post.actions';
import {Delete, Edit} from '@material-ui/icons';



function DeleteComment({comment, postId}) {

    const [isAuthor, setIsAuthor] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id));
    }
    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true);
            }
        }
        checkAuthor();
    }, [uid, comment.commenterId]);


    return (
        <div className="edit-comment">
            {isAuthor && (
                <div onClick={() => {
                    // confirmation
                    if(window.confirm('Voulez-vous supprimer ce commentaire ?')) {
                        handleDelete();
                    }
                }}>
                < Delete />
                </div>
            )}
        </div>
    )
}

export default DeleteComment;
