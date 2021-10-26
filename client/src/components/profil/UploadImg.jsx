import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';
import { isEmpty } from "../../Utils";



function UploadImg() {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.userError);

    
    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.username);
        data.append("userId", userData._id);
        data.append("file", file);

        dispatch(uploadPicture(data, userData._id));
        window.location.reload()
    }
    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">
            <span className='changePicButton'>Changer photo de profil</span>
            <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" style={{display:"none"}}  onChange={(e)=> setFile(e.target.files[0])} />
            { !isEmpty(error.format) && <p className='error'>{error.format}</p>}
            { !isEmpty(error.maxSize) && <p className='error'>{error.maxSize}</p>}
            </label>
        < br/>
        <input type="submit" value="Envoyer" className='InputSubmitUpdateImg'/>
        </form>
    )
}

export default UploadImg;