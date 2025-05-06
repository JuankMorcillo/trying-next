'use client';

import { useData } from '@/context/DataContext'
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useMemo } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Map,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl/maplibre';

export default function Mapa() {

  const { fetchAlertById } = useData()
  const { mapa: idAlerta } = useParams()
  const [alerta, setAlerta] = useState()

  const pin = useMemo(
    () => (
      <Marker
        key={`marker1`}
        longitude={alerta?.longitude}
        latitude={alerta?.latitude}
        anchor="bottom"
        onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>

      </Marker>
    ), [alerta]
  )

  const handleFetchAlert = async (id) => {
    const data = await fetchAlertById(id)
    setAlerta(data)
  }

  useEffect(() => {
    if (idAlerta) {
      handleFetchAlert(idAlerta)
    }
  }, [idAlerta])


  return (
    <>

      {
        alerta &&

        <div className='grid place-content-center h-full'>
          <div className=''>
            <Map
              initialViewState={{
                longitude: alerta.longitude,
                latitude: alerta.latitude,
                zoom: 14
              }}
              style={{ width: 800, height: 600 }}
              mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
            >
              {pin}
            </Map>
          </div>
        </div>

      }

    </>
  )
}

