
import "./map.css";
import React from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Map from "../../components/map-component/Map";



export default function MapPage() {

  return (
    <>
      <Topbar />
      <div className="mapContainer">
        <Sidebar />
        <div className="mapWrapper">
          <Map/>
        </div>
      </div>
    </>
  );
}