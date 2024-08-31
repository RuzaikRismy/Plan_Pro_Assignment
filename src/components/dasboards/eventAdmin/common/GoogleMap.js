import React, { useEffect } from "react";

const GoogleMap = () => {
  useEffect(() => {
    const initMap = async () => {
      // Load the Google Maps API script
      const { Map } = await window.google.maps.importLibrary("maps");
      const myLatlng = { lat: -25.363, lng: 131.044 };
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
      });

      // Create the initial InfoWindow.
      let infoWindow = new window.google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
      });

      infoWindow.open(map);

      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
      });
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Load the Google Maps script if it's not already loaded
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBWS2m7_eGgBhig226uAERqTL9cFY_qOWU&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
};

export default GoogleMap;
