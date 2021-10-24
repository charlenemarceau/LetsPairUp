import React, {useState} from 'react';
import UploadImg from './UploadImg';
import { dateParser } from '../../Utils';
import { useSelector } from "react-redux";
import { CloseOutlined } from '@material-ui/icons'
import './update.css'
import { useDispatch } from 'react-redux';
import { updateBio } from '../../actions/user.actions'

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const [updateProfilModal, setUpdateProfilModal] = useState(true);
    const error = useSelector((state) => state.errorReducer.userError);
    const dispatch = useDispatch();

    const handleUpdate =  () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    }

    return (
        <>
            { updateProfilModal ? (
                <>
            <div className="profil-container">
            <div onClick={() => setUpdateProfilModal(false)} className="crossUpdate">< CloseOutlined /> </div>
            <h1 className='updateTitle'>Votre profil {userData.username}</h1>
            <div className="updateContainer">
                <div className="left-part-update">
                    <h3>Photo de profil</h3>
                    <img src={userData.avatar} alt="user-pic" className='updateUserImg' />
                    <UploadImg />
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                </div>
                <div className="right-part-update">
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {updateForm === false && (
                        <>
                        <p onClick={() => setUpdateForm(!updateForm)}> {userData.bio} </p>
                        <button onClick={() => setUpdateForm(!updateForm)} className='buttonChangeBio'>Changer de bio</button>
                        </>
                        )}
                        {updateForm && (
                            <>
                            <textarea type='text' defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                            <button onClick={handleUpdate} className='changeBioButton'>Valider</button>
                            </>
                        )}
                        < br/>
                        <h4>Membre depuis le : { dateParser(userData.createdAt)}</h4>
                    </div>
                </div>
                
            </div>
            </div>
            </>
            ) : (
                <div className="profilvide"></div>
            )}
        </>
    );
};

export default UpdateProfil;