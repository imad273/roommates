import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

function Map({ keyword }) {

   async function getPlaces() {
      const request = await fetch('http://localhost:3001/places', {
         method: 'Get',
         headers: {
            'Content-Type': 'application/json'
         }
      })
      var response = await request.json();
      return response;
   }

   async function findCoordinates() {
      const request = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=pk.eyJ1IjoiZW1hZDI3MyIsImEiOiJja3hmdzVqaXYzamJ3MnJvNW53MWc3a3IwIn0.hxBxt4FUMsFkD8mmeFYhbA`)
      var response = await request.json();

      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
         container: mapContainer.current,
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [response.features[0].geometry.coordinates[0], response.features[0].geometry.coordinates[1]],
         zoom: 6
      });
      map.current.addControl(new mapboxgl.NavigationControl());

      getPlaces().then(res => {
         res.map((mark) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.innerHTML = `$${mark.Price}`;
            new mapboxgl.Marker(el).setLngLat([mark.Longitude, mark.Latitude]).setPopup(
               new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(
                     `<h3>${mark.Title}</h3><a href='#'>Take a look</a>`
                  )
            ).addTo(map.current);

         })
      })
   }

   useEffect(() => {
      findCoordinates();
   }, []);

   mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hZDI3MyIsImEiOiJja3hmdzVqaXYzamJ3MnJvNW53MWc3a3IwIn0.hxBxt4FUMsFkD8mmeFYhbA';
   const mapContainer = useRef(null);
   const map = useRef(null);

   return (
      <div>
         <div ref={mapContainer} className="map-container" />
      </div>
   )
}

export default Map;
