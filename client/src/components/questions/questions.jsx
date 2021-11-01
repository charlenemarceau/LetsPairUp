import React, {useState, useEffect} from 'react';
import { MoreVert, Edit, Comment } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { dateParserPost, isEmpty } from '../../Utils';
import FollowHandler from '../followHandler/FollowHandler';
import { updateQuestion } from '../../actions/question.action';
import DeleteQuestion from './DeleteQuestion'
import QuestionComments from './QuestionComments';

function QuestionShare( {question} ) {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [moreOptions, setMoreOptions] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
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
            dispatch(updateQuestion(question._id, textUpdate));
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
                            if (user._id === question.userId) {
                                return user.avatar
                            }
                            else return null
                        }).join("")} alt="" className='postProfileImg'/>
                        <span className="postUserName">
                            <h3>
                            {!isEmpty(usersData[0]) && usersData
                                .map((user) => {
                                    if (user._id === question.userId) return user.username;
                                    else return null;
                            }).join("") }
                            </h3>
                            {/** if current user is the poster user, won't have the follow/unfollow suggestion */}
                            {question.userId !== userData._id && (
                            <FollowHandler idToFollow={question.userId} type={"card"}/>
                            )}
                        </span>
                    <span className="postText">{question?.categories}</span>
                    </div>
                    <div className="postTopRight">
                        <span className="postDate">{dateParserPost(question.createdAt)}</span>
                        {(userData._id === question.userId || userData.isAdmin === true) && (
                            <>
                                { moreOptions && (
                                    <>
                                    <div className="moreOptionsContainer">
                                    <div onClick={handleMenuClose} className="moreOptions-close">&#10006;</div>
                                    <div className="moreOptions">
                                        < Edit onClick={() => setIsUpdated(!isUpdated)}/>
                                        < DeleteQuestion id={question._id}/>
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
                    {isUpdated === false && <span className="postText">{question?.question}</span>}
                    {isUpdated && (
                        <div className="update-post">
                            <textarea defaultValue={question?.question} onChange={((e) => setTextUpdate(e.target.value))}/>
                            {/* <div className="button-container"> */}
                                <button className="btn" onClick={updateItem}>
                                    Valider modification
                                </button>
                            {/* </div> */}
                        </div>
                    )}
                    
                    {question.image && <img className='postImg' src={question.image} alt="" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomRight">
                    <span className="postCommentText">
                        < Comment onClick={() => setShowAnswer(!showAnswer)} className="CommentButton" />
                    </span>
                    <div className="CommentsContainer">
                        {showAnswer && (
                            <QuestionComments question={question} />
                        )}
                    </div>
                        {/* // {question.comments ? question.comments.length : 0}{" "}
                        // commentaire
                        // {question.comments && question.comments.length > 1 ? "s" : null} */}
                    </div>
                </div>
            </div>
            </>
            )}
        </div>
        </>
    )
}

export default QuestionShare;