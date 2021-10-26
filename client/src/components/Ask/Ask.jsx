import React, { useState, useEffect } from 'react';
import "../share/share.css";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../Utils";
import { PermMediaOutlined, CancelOutlined} from '@material-ui/icons';
import { addQuestion, getQuestions } from '../../actions/question.action';



function Ask() {
    const [isLoading, setIsLoading] = useState(true);
    const [question, setQuestion] = useState("");
    const [category, setCategory] = useState("");
    const [questionPicture, setQuestionPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();


    const handlePost = async () => {
        if (question || questionPicture) {
          const data = new FormData();
          data.append('userId', userData._id);
          data.append('question', question);
          data.append('caterogy', category)
          if (file) data.append("file", file);

          await dispatch(addQuestion(data));
          dispatch(getQuestions());
          cancelPost();
        //   window.location.reload();
        } else {
          alert("Veuillez entrer un message")
        }
      };
     
      const handlePicture = (e) => {
          // create a link for the image
        setQuestionPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
      }; 
    
      const handleCategory = (e) => {
          setCategory(e.target.value);
      }
      const cancelPost = () => {
        setQuestion("");
        setQuestionPicture("");
        setFile("");
      };

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
    }, [userData])

    return (
        <div className="share">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
            <>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={userData.avatar} alt="" />
                    <input placeholder={"Vous avez une question " + userData.username + " ?"} className='shareInput' onChange={((e) => setQuestion(e.target.value))} value={question} />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        {/*create pseudo url to visualize img*/}
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        < CancelOutlined className="shareCancelImg" onClick={() => setFile("")}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={handlePost}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMediaOutlined className='shareIcon'/>
                            <span className="shareOptionText">Image ou vidéo</span>
                            <input type="file" name="file" id="file" accept=".jpg, .png, .jpeg" style={{display:"none"}} onChange={(e) => handlePicture(e)}/>
                        </label>
                        {/* <div className="shareOption">
                            <LocationOnOutlined className='shareIcon'/>
                            <span className="shareOptionText">Localisation</span>
                        </div> */}
                    </div>
                    { !isEmpty(error.format) && <p className='error'>{error.format}</p>}
                    { !isEmpty(error.maxSize) && <p className='error'>{error.maxSize}</p>}
                    { question || questionPicture ? (
                        <>
                        <h3>Catégories</h3>
                        <select name="" id="" onChange={(e) => handleCategory(e)}>
                            <option value="FAMILLES">Familles</option>
                            <option value="EDUCATIONS">Educations</option>
                            <option value="AGENCES">Agences</option>
                            <option value="VOYAGES">Voyages</option>
                            <option value="PROGRAMME">Programme</option>
                            <option value="VISAS">Visas</option>
                            <option value="TAXES">Taxes</option>
                            <option value="AUTRES">Autres</option>
                        </select>
                        <button className="cancelButton" onClick={cancelPost}>Annuler</button>
                        </>
                    ) : null }
                    <button className="shareButton" type='submit'>Envoyer</button>
                </form>
            </div>
            </>
            )}
        </div>
    )
}

export default Ask;

