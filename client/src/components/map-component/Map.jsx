import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup, GeolocateControl}  from 'react-map-gl';
import { Room } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPins } from "../../actions/pin.actions";
import { isEmpty } from '../../Utils';
import axios from 'axios';



// use of the geolocalisation 
const geolocateControlStyle= {
    right: 10,
    top: 10
  };
  
  function Map( {pin}) {
    const usersData = useSelector((state) => state.usersReducer) // get user data
    const userData = useSelector((state) => state.userReducer) // get user data
    const pinsData = useSelector((state) => state.pinReducer) // get pin data
    const [pins, setPins] = useState([]);
    const [loadPin, setLoadPin] = useState(true);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [link, setLink] = useState(false);
    const dispatch = useDispatch()
    const [viewport, setViewport] = useState({
    width: "73.8vw",
    height: "100vh",
    latitude: 37.090240,
    longitude: -95.712891,
    zoom: 3
  });

  useEffect(() => {
    if (loadPin) {
        dispatch(getPins());
        setLoadPin(false);
    }
    else return null;
  }, [loadPin, dispatch])


  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({...viewport, latitude: lat, longitude:long})
  }

  const handleAddClick = (e) => {
    // fetching the latitude and longitude on the click's current place
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
   }
   
   const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      userId: userData._id,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <ReactMapGL className='mapComponent'
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/marceaucharlene/ckuvsvag02ekx18mvr14aola5"
      onDblClick={handleAddClick}
      transitionDuration="150"
    >
    {/* <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
      /> */}
          {!isEmpty(pinsData[0]) && 
            pinsData.map((pin) => (
          <>
          <Marker
            latitude={pin.lat}
            longitude={pin.long}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          >
            <Room className='HereIcon' style={{fontSize:viewport.zoom * 7, cursor: "pointer", color: pin.userId === userData._id ? '#ffbf69' : '#2ec4b6'}}
             onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}/>
          </Marker>
            {pin._id === currentPlaceId && (
              <Popup
                key={pin._id}
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                <label>Au pair</label>
                <div className="CardInfo">
                <img src={!isEmpty(usersData[0]) && usersData
                        .map((user) => {
                            if (user._id === pin.userId) {
                                return user.avatar
                            }
                            else return null
                        }).join("")} alt="" className='postProfileImg' />
                <h4 className="username">
                  {!isEmpty(usersData[0]) && usersData
                    .map((user) => {
                      if (user._id === pin.userId) return user.username;
                      else return null;
                  }).join("") }</h4>
                  </div>
                  {!isEmpty(usersData[0]) && usersData
                    .map((user) => {
                      if (user._id === pin.userId) return user.city;
                      else return null;
                  }).join("") }
              </div>
              </Popup>
            )}
            </>
            ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "orange",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                <label className="CheckBoxLabel" htmlFor="subscribeNews">Souhaitez-vous mettre votre localisation ?</label></div>
                  <button type="submit" className="submitButton">
                    Ajouter votre localisation
                  </button>
                </form>
              </div>
            </Popup>
            </>
         )}
    </ReactMapGL>
  );
}

export default Map;
