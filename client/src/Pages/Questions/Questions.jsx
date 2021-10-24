import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import './questions.css';
import QuestionsFeed from '../../components/questions-feed/Questions-feed';


function Questions() {
    return (
      <>
          <Topbar/>
          <div className="questionContainer">
            <QuestionsFeed/>
          </div>
       </>
    )
}

export default Questions