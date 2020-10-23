import React, { useRef, useEffect } from 'react';

const Map = props => {
  const mapRef = useRef();
  
  const { center, zoom } = props;

  //const coordinates = {lat: -34.397, lng: 150.644};

  //Re-render upon any changes to zoom and the center
  //Tell google map where to render using useRef()
  useEffect(() => {

    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });
  
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);  

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
