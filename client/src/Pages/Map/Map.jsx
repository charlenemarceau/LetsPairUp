import "./map.css";
import React from 'react';
import Topbar from "../../components/topbar/Topbar";
import Map from "../../components/map-component/Map";
import SidebarHome from "../../components/sidebar/SidebarHome";

export default function MapPage() {

  return (
    <>
      <Topbar />
      <div className="mapPageComponent">
      <div className="left-part-map">
      < SidebarHome />
      </div>
      <div className="mapContainer">
        <div className="mapWrapper">
          <Map/>
        </div>
      </div>
      </div>
    </>
  );
}