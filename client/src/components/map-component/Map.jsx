import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, {Marker, Popup}  from 'react-map-gl';
import { Room } from '@material-ui/icons';
import axios from "axios";
import {Link} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";



// use of the geolocalisation 
// const geolocateControlStyle= {
//   right: 10,
//   top: 10
// };

function Map( {pin}) {
  const [pins, setPins] = useState([]);
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [link, setLink] = useState(false);
  const [viewport, setViewport] = useState({
    width: "80vw",
    height: "100vh",
    latitude: 37.090240,
    longitude: -95.712891,
    zoom: 3
  });

  useEffect (() => {
    const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${pin.userId}`);
        setUser(res.data)
        console.log(res.data)
    };
    fetchUser();
}, [ pins.userId])

  useEffect(() => {
    const getPins = async () => {
      try {
          const res = await axios.get('/pins');
          setPins(res.data)
      }catch(err) {
        console.log(err)
      }
    }
    getPins();
  }, [])

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
      userId: currentUser,
      link: `/profile/${currentUser.username}`,
      lat: newPlace.lat,
      long: newPlace.long,
     }
     try {
        const res = await axios.post("/pins", newPin);
        setPins([...pins, res.data]);
        setNewPlace(null);
     } catch (err) {
       console.log(err)
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
      {pins.map((p) => (
        <>
        <Marker
          latitude={p.lat}
          longitude={p.long}
          offsetLeft={-3.5 * viewport.zoom}
          offsetTop={-7 * viewport.zoom}
        >
          <Room className='HereIcon' style={{fontSize:viewport.zoom * 7, cursor: "pointer", color: p.userId === currentUser ? '#ffbf69' : '#2ec4b6'}}
           onClick={() => handleMarkerClick(p._id, p.lat, p.long)}/>
        </Marker>
          {p._id === currentPlaceId && (
            <Popup
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="card">
              <label>Au pair</label>
              <h4 className="username">{user.username}</h4>
              <label>Lien profil</label>
              <Link to={`/profile/${user.username}`}>
              <p>Profil</p>
              </Link>
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
                <label className="CheckBoxLabel" for="subscribeNews">Souhaitez-vous mettre un lien vers votre profil ?</label></div>
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
