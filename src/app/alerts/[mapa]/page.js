'use client';

import { useData } from '@/context/DataContext'
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useMemo } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Map,
  Marker,
  Popup,
} from 'react-map-gl/maplibre';

const icons = [
  {
    id: '1',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-red-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
    </svg>,
    color: 'red'
  },
  {
    id: '2',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-yellow-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>,
    color: 'yellow'
  },
  {
    id: '3',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-blue-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>,
    color: 'blue'
  },
]

const colorClassMap = {
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  blue: "bg-blue-500",
  // agrega más si necesitas
};

export default function Mapa() {

  const { fetchAlertById } = useData()
  const { mapa: idAlerta } = useParams()
  const [alerta, setAlerta] = useState()

  const pin = useMemo(
    () => (
      alerta && <Marker
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
        {icons.find(icon => icon.id == alerta.priority)?.icon}
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
    <div className='grid grid-cols-1 p-10'>

      {
        alerta &&

        <>
          <div className='font-bold'>
            {
              alerta.priority == 1 ?
                <span className='text-red-500'>Alerta Roja</span>
                :
                alerta.priority == 2 ?
                  <span className='text-yellow-500'>Alerta Amarilla</span>
                  :
                  <span className='text-green-500'>Alerta Verde</span>
            }
          </div>

          <div className='grid grid-cols-2 p-8'>

            <div className='grid grid-cols-1 gap-2'>

              <div className='grid grid-cols-2 gap-2'>
                <div className='flex gap-2'>
                  <span className='font-bold'>ID:</span>
                  <span>{alerta.id}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>Estado:</span>
                  <span>{alerta.status}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>Prioridad:</span>
                  <span>{alerta.priority}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>Fecha de Creación:</span>
                  <span>{alerta.created_at}</span>
                </div>
                <div className='flex gap-2'>
                  <span className='font-bold'>Descripción:</span>
                  <p>{alerta.description}</p>
                </div>
              </div>

              <div>
                <button className='bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600'>
                  En espera de llamada
                </button>
              </div>

              <div>

                Estado de alerta:
                <button>
                  {
                    alerta.status == 4 ?
                      <span className='bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600'>Activa</span>
                      :
                      alerta.status == 10 ?
                        <span className='bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-600'>Resuelta</span>
                        :
                        <span className='bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600'>Cerrada</span>
                  }
                </button>

              </div>

            </div>

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
        </>
      }

    </div>
  )
}

