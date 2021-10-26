import React from 'react';
import Advices from '../../components/advices.jsx/Advices';
import SidebarHome from '../../components/sidebar/SidebarHome';
import Topbar from '../../components/topbar/Topbar';
import './advice.css';

function Advice() {
    return (
        <>
            <Topbar />
            <div className="advicePageContainer">
                <SidebarHome />
                <div className="advicesWrapper">
                <Advices />
                </div>
            </div>
        </>
    )
}

export default Advice;
