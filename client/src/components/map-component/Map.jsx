import React, { useState, useContext } from 'react';
import ReactMapGL, {Marker, Popup}  from 'react-map-gl';
import { Room } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { UidContext } from "../AppContext";
import { useSelector, useDispatch } from 'react-redux';
import { addPin, getPins } from "../../actions/pin.actions";
import { isEmpty } from '../../Utils';



// use of the geolocalisation 
// const geolocateControlStyle= {
  //   right: 10,
  //   top: 10
  // };
  
  function Map( {pin}) {
    const userData = useSelector((state) => state.userReducer) // get user data
    const [pins, setPins] = useState([]);
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

   const handleSubmit = async () => {
    //  e.preventDefault();
    //  const newPin = {
    //   userId: userData._id,
    //   link: `/profil/${userData.username}`,
    //   lat: newPlace.lat,
    //   long: newPlace.long,
    //  }
    if (newPlace) {
      const data = new FormData();
      data.append('userId', userData._id);
      data.append('link', link);
      data.append('lat', newPlace.lat);
      data.append('long', newPlace.long);
      await dispatch(addPin(data));
      dispatch(getPins());
      setNewPlace(null);
    
    //  try {
    //     // const res = await axios.post("/pins", newPin);
    //     // setPins([...pins, res.data]);
    //     // setNewPlace(null);
    //  } catch (err) {
      //  console.log(err)
    //  }
    } else {
    alert("Veuillez entrer un message")
    }
   }


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
      {!isEmpty(pins[0]) && (
        pins.map((pin) => {
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
                {/* <h4 className="username">{user.username}</h4> */}
                <label>Lien profil</label>
                <Link to="/profil">
                <p>Profil</p>
                </Link>
              </div>
              </Popup>
            )}
            </>
        }))}
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
                  color: "tomato",
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
                <input type="checkbox" onChange={(e) => setLink(!link)}/>
                <label className="CheckBoxLabel" for="subscribeNews">Souhaitez-vous mettre votre localisation ?</label></div>
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
