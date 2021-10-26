import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import './questions.css';
import QuestionsFeed from '../../components/questions-feed/Questions-feed';
import SidebarHome from '../../components/sidebar/SidebarHome';
import RightbarAsk from '../../components/rightbar/RightbarAsk';


function Questions() {
    return (
      <>
          <Topbar/>
          <div className="questionContainer">
            <SidebarHome/>
            <QuestionsFeed/>
            <RightbarAsk />
          </div>
       </>
    )
}

export default Questions