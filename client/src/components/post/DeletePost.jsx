import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';
import {Delete} from '@material-ui/icons';


function DeletePost(props) {
    const dispatch = useDispatch();
    const deleteQuote = () => {
        dispatch(deletePost(props.id))
    }
    
    return (
        <div onClick={() => {
            // confirmation
            if(window.confirm('Voulez-vous supprimer ce post ?')) {
                deleteQuote();
            }
        }}>
        < Delete />
           
        </div>
    )
}

export default DeletePost;
