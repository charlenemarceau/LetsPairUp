import React, {useState} from 'react';
import './question-feed.css';
import Question from '../questions/questions';
import Ask from '../Ask/Ask'

export default function QuestionsFeed() {
    const [questions, setQuestions] = useState(['']);

    return (
        <div className="questionFeed">
            <div className="questionFeedWrapper">
                <Ask />
                {questions.map((q, i) => (
                    <Question key={i} question={q} />
                ))}
            </div>
        </div>
    )
}

