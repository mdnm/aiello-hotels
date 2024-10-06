import { APIProvider, InfoWindow, Map, Marker, useMarkerRef } from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';
import * as m from '../paraglide/messages';

type Location = {
  lat: number; lng: number;
  title: string;
  address: string;
  path: string;
  image: string;
};

const MarkerWithInfoWindow = ({
  location,
  isInfoWindowOpen,
  handleInfoWindowOpenChange,
}: {
  location: Location,
  isInfoWindowOpen: boolean,
  handleInfoWindowOpenChange: (title: string) => void
}) => {
  // `markerRef` and `marker` are needed to establish the connection between
  // the marker and infowindow (if you're using the Marker component, you
  // can use the `useMarkerRef` hook instead).
  const [markerRef, marker] = useMarkerRef();

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(
    () => handleInfoWindowOpenChange(location.title),
    []
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => handleInfoWindowOpenChange(''), []);

  return (
    <>
      <Marker
        ref={markerRef}
        position={{ lat: location.lat, lng: location.lng }}
        onClick={handleMarkerClick}
        clickable
        icon="https://www.aiellohotels.com/wp-content/themes/Divi/includes/builder/images/marker.png"
      />

      {isInfoWindowOpen && (
        <InfoWindow anchor={marker} onClose={handleClose} className="flex flex-col items-center gap-1 max-w-[200px] px-1 text-center">
          <p className="text-lg font-bold">{location.title}</p>
          <p className="text-base">{location.address}</p>
          <img className="!max-w-[200px] rounded-md" src={location.image} alt={location.title} />
          <a href={location.path} className="bg-primary text-secondary uppercase py-2 px-3 rounded-md text-xl w-full hover:bg-secondary hover:text-primary transition-all duration-200">
            {m.book()}
          </a>
        </InfoWindow>
      )}
    </>
  );
};

const Locations = ({
  locations,
}: {
  locations: Location[];
}) => {
  const [openInfoWindow, setOpenInfoWindow] = useState('')

  return (
    <>
      {locations.map((location) => (
        <MarkerWithInfoWindow
          key={location.title}
          isInfoWindowOpen={openInfoWindow === location.title}
          handleInfoWindowOpenChange={setOpenInfoWindow}
          location={location}
        />
      ))}
    </>
  )
}

export const GoogleMap = ({
  locations,
  lang,
  region,
}: {
  locations: Location[];
  lang: string;
  region: string;
}) => {
  const mapStyles = [
    {
      stylers: [{ saturation: -85 }],
      featureType: 'all',
      elementType: 'all'
    },
    {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi.school',
      elementType: 'labels.text',
      stylers: [{ visibility: 'off' }]
    },
  ]

  return (
    <APIProvider
      apiKey="AIzaSyDEDH6KbS1E14gpk3o9VJOvQe26o7HDDME"
      language={lang}
      region={region}
    >
      <Map
        className="w-full h-[500px]"
        defaultCenter={{ lat: 45.458874, lng: 9.188308 }}
        defaultZoom={13}
        styles={mapStyles}
      >
        <Locations locations={locations} />
      </Map>
    </APIProvider>
  );
}