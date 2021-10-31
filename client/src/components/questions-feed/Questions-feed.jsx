import React, {useState, useEffect} from 'react';
import './question-feed.css';
import QuestionShare from '../questions/questions';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../../actions/question.action.js';
import Ask from '../Ask/Ask';
import { isEmpty } from '../../Utils';


export default function QuestionsFeed() {
    const [loadQuestions, setloadQuestions] = useState(true);
    const [countThread, setCountThread] = useState(5);
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questionReducer);

    const loadMore = () =>  { // infinite scroll
        if (window.innerHeight + document.documentElement.scrollTop + 1 >
             document.scrollingElement.scrollHeight) { // at this point on scroll Y
                 setloadQuestions(true); // trigger function
             }
    }

    useEffect(() => {
        if (loadQuestions) {
            dispatch(getQuestions(countThread));
            setloadQuestions(false);
            setCountThread(countThread + 5);
        }
        window.addEventListener('scroll', loadMore); // to add an infinite scroll
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadQuestions, dispatch, countThread])

    return (
        <div className="questionFeed">
            <div className="questionFeedWrapper">
                <h2 className='questionH2'>Foire aux questions</h2>
                <Ask />
                <h2 className='questionH2'>Les dernières questions</h2>
                {!isEmpty(questions[0]) && (
                    questions.map((question) => (
                        <QuestionShare key={question._id} question={question}  />
                    ))
                ) }
            </div>
        </div>
    )
}

