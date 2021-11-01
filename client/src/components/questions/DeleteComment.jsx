import React, {useState, useEffect, useContext} from 'react';
import { UidContext } from "../AppContext";
import { useDispatch, useSelector} from "react-redux";
import { deleteComment,  getQuestions } from '../../actions/question.action';
import {Delete} from '@material-ui/icons';



function DeleteComment({comment, questionId}) {
    const userData = useSelector((state) => state.userReducer) // get user data
    const [isAuthor, setIsAuthor] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteComment(questionId, comment._id))
        .then(() => dispatch(getQuestions()));

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
            {(isAuthor || userData.isAdmin === true) && (
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
