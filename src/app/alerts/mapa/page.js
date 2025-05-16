'use client';

import { useData } from '@/context/DataContext'
import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo, useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css';
import {
    Map,
    Marker,
    Popup,
} from 'react-map-gl/maplibre';
import Inputs from '@/components/input';
import Conteo_Alertas from '@/components/ui/conteo_alertas';
import useRoleAccess from '@/lib/hooks/RoleAccess';

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

    const { fetchAlerts } = useData()
    const { status } = useSession();
    const [data, setData] = useState()
    const [info, setInfo] = useState()
    const [popupInfo, setPopupInfo] = useState(null);
    const { filter } = useRoleAccess()

    const handleFetchAlerts = async () => {
        const data = await fetchAlerts()
        setData(data.alerts)
    }

    const inputs = [
        {
            id: 'priority',
            label: 'Prioridad',
            list: true,
            placeholder: 'Prioridad',
            required: false,
            options: [
                { value: 1, label: 'Alta' },
                { value: 2, label: 'Media' },
                { value: 3, label: 'Baja' }
            ]
        },
        {
            id: 'status',
            label: 'Estado',
            list: true,
            placeholder: 'Estado',
            required: false,
            options: [
                { value: 4, label: 'Activa' },
                { value: 10, label: 'Resuelta' },
                { value: 12, label: 'Cerrada' }
            ],
        },
        {
            id: 'fechaInicio',
            label: 'Fecha inico',
            required: false,
            type: 'date',
        },
        {
            id: 'fechaFin',
            label: 'Fecha fin',
            required: false,
            type: 'date',
        },
    ]

    const style = {
        cols: 1,
        textButton: 'Buscar',
        clearButton: true,
    }

    const pins = useMemo(
        () =>
            data && data.map((alert, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={alert.longitude}
                    latitude={alert.latitude}
                    anchor="top"
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                        console.log(icons.find(icon => icon.id == alert.priority).color);

                        setPopupInfo({ ...alert, color: icons.find(icon => icon.id == alert.priority).color });
                    }}
                >
                    {
                        icons.find(icon => icon.id == alert.priority)?.icon
                    }
                </Marker>
            )),
        [data]
    );


    useEffect(() => {
        if (status === 'authenticated') {
            handleFetchAlerts();
        }
    }, [status]);

    return (
        <div className='grid place-content-center p-8'>
            <div className='font-bold'>
                Mapa de alertas
            </div>
            <Conteo_Alertas />
            {
                data &&
                <div className='flex flex-row gap-6 place-content-center p-8'>
                    <div className=''>
                        <Map
                            initialViewState={{
                                longitude: data[0].longitude,
                                latitude: data[0].latitude,
                                zoom: 14
                            }}
                            style={{ width: 800, height: 600 }}
                            mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
                        >


                            {pins}

                            {popupInfo && <Popup
                                longitude={Number(popupInfo.longitude)}
                                latitude={Number(popupInfo.latitude)}
                                closeButton={false}
                                onClose={() => setPopupInfo(null)}
                                closeOnClick={true}
                                anchor="bottom"
                            >
                                <div className={`flex flex-col ${colorClassMap[popupInfo.color] || "bg-gray-200"} rounded-2xl shadow-lg p-2 border border-gray-300`}>
                                    <span>{popupInfo.observation}</span>
                                </div>

                            </Popup>}

                        </Map>
                    </div>
                    <div>

                        {
                            filter &&
                            <Inputs setInfo={setInfo} styles={style} inputs={inputs} />
                        }



                    </div>
                </div>
            }

        </div>
    )
}
