import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Map2 = props => {
  const mapRef = useRef();
  
  const { center, zoom, hazards } = props;

  const coordinates = {lat: 37.733795, lng: -122.446747};
  const coordinates2 = {lat: 37.763230, lng: -122.483850}
  //Re-render upon any changes to zoom and the center
  //Tell google map where to render using useRef()



  useEffect(() => {

    const map = new window.google.maps.Map(mapRef.current, {
      center: coordinates,
      zoom: zoom
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(hazards){
      for(let x = 0; x < hazards.length; x++){
      let contentString = `<div><h5>${hazards[x].name}</h5><p>${hazards[x].category}</p><a href="http://localhost:3000/hazard/${hazards[x]._id}">More Info</a></div>`;
        let infowindow = new window.google.maps.InfoWindow({
          content: contentString
        });
        let marker = new window.google.maps.Marker({ position: hazards[x].location, map: map, label: labels[x % labels.length] });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      }
    }

  }, [coordinates, zoom]);  

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map2;