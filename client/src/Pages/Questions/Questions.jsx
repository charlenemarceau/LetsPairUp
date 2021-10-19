import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './questions.css';
import '../../components/sidebar/Sidebar'
import QuestionsFeed from '../../components/questions-feed/Questions-feed';


function Questions() {
    return (
      <>
          <Topbar/>
          <div className="questionContainer">
            <Sidebar/>
            <QuestionsFeed/>
          </div>
       </>
    )
}

export default Questions