import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../../actions/question.action';
import {Delete} from '@material-ui/icons';


function DeleteQuestion(props) {
    const dispatch = useDispatch();
    const deleteQuote = () => {
        dispatch(deleteQuestion(props.id))
    }
    
    return (
        <div onClick={() => {
            // confirmation
            if(window.confirm('Voulez-vous supprimer cette question ?')) {
                deleteQuote();
            }
        }}>
        < Delete />
        </div>
    )
}

export default DeleteQuestion;
