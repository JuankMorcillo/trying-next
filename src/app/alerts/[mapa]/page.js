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
import { useSession } from 'next-auth/react';

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
  const { status } = useSession();

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
  }, [idAlerta, status])


  return (
    <div className='grid grid-cols-1 p-10'>

      {
        alerta &&

        <>
          <div className='font-bold'>
            {
              alerta.priority == 1 ?
                <>
                  <span className='text-red-500 text-xl'>Alerta Roja</span>
                  <hr className='my-4 text-red-500 border-2' />
                </>

                :
                alerta.priority == 2 ?
                  <>
                    <span className='text-yellow-500 text-xl'>Alerta Amarilla</span>
                    <hr className='my-4 text-yellow-500 border-2' />
                  </>
                  :
                  <>
                    <span className='text-blue-500 text-xl'>Alerta Azul</span>
                    <hr className='my-4 text-blue-500 border-2' />
                  </>
            }
          </div>

          <div className='grid grid-cols-2 p-8 gap-12'>

            <div className='grid grid-cols-1 gap-1'>

              <div className='grid grid-cols-2 gap-1'>
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

              <div className='flex items-center'>
                <button className='flex bg-gray-300 text-gray h-10 w-auto rounded px-4 py-2 cursor-pointer gap-3 border-1 border-gray-500 shadow-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  En espera de llamada
                </button>
              </div>

              <div className='flex gap-2 items-center'>

                <span className='font-bold'>Estado de la alerta:</span>

                <button>
                  {
                    alerta.status == 4 ?
                      <span className='flex bg-red-500 text-white rounded-full px-4 py-2 gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Activa
                      </span>
                      :
                      alerta.status == 10 ?
                        <span className='flex bg-blue-500 text-white rounded-full px-4 py-2 gap-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                          </svg>
                          En progreso
                        </span>

                        :
                        alerta.status == 12 ?
                          <span className='flex bg-green-500 text-white rounded-full px-4 py-2 gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Resuelta
                          </span>
                          :
                          <span className='flex bg-gray-500 text-white rounded-full px-4 py-2  gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            Cerrada
                          </span>
                  }
                </button>

              </div>

              <div className='flex gap-2'>

                <span className='font-bold py-3'>
                  Grabación de voz:
                </span>

                <div className='grid grid-cols-1 gap-x-2 gap-y-0'>

                  <audio controls>
                    <source src={alerta.audio} type="audio/mpeg" />
                  </audio>
                  <audio controls>
                    <source src={alerta.audio} type="audio/mpeg" />
                  </audio>

                </div>

              </div>

              <div className='flex gap-2'>
                <span className='font-bold py-3'>
                  Audiovisual:
                </span>

                <div className='flex gap-2'>

                  <video width="320" style={{ height: '240px' }} controls>
                    <source src={alerta.video} type="video/mp4" />
                  </video>

                  <img src='/images/100_0331.jpg' alt="Imagen de la alerta" className='w-60 h-60' />

                </div>

              </div>

            </div>

            <div className='grid grid-cols-1 gap-4 max-w-[800px]'>
              <div className='flex gap-4'>
                <button className='bg-white-500 text-blue-600 border-blue-500 border-1 rounded-full px-4 py-2 hover:bg-blue-300 flex gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  Bitácora
                </button>
                <button className='bg-white-500 text-blue-600 border-blue-500 border-1 rounded-full px-4 py-2 hover:bg-blue-300 flex gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                  </svg>
                  Ver mapa
                </button>
                <button
                  disabled={alerta.status == 14}
                  className={`bg-white-500 text-blue-600 border-blue-500 border-1 rounded-full px-4 py-2 ${alerta.status == 14 ? 'cursor-not-allowed' : 'hover:bg-blue-300'} flex gap-2`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                  </svg>
                  cambiar estado
                </button>
              </div>
              <div className='shadow-md rounded-lg border-1 border-gray-300'>
                <Map
                  initialViewState={{
                    longitude: alerta.longitude,
                    latitude: alerta.latitude,
                    zoom: 14,
                  }}
                  style={{ width: "100%", height: "800px", maxWidth: "800px", maxHeight: "800px" }}
                  className=""
                  mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
                >
                  {pin}
                </Map>
              </div>
            </div>

          </div>
        </>
      }

    </div >
  )
}

