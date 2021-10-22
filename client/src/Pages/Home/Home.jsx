import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Thread from '../../components/thread/Thread';
import Rightbar from '../../components/rightbar/Rightbar';
import './home.css';

function Home() {
    return (
        <>
          <Topbar/>
          <div className="homeContainer">
            <Sidebar/>
            <Thread />
            <Rightbar />
          </div>
        </>
    )
}

export default Home
