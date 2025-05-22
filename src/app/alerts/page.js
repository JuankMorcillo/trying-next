'use client';
import React, { useEffect, useState } from 'react'
import { useData } from '@/context/DataContext'
import { useSession } from 'next-auth/react';
import MyTable from '@/components/table';
import { useRouter } from "next/navigation";
import Conteo_Alertas from '@/components/ui/conteo_alertas';

const badgeClassStatus = {
    10: {
        'color': 'text-red-500 font-bold rounded-md',
        'text': 'Pendiente',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    },
    12: {
        'color': 'text-orange-500 font-bold rounded-md',
        'text': 'En progreso',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
        </svg>
    },
    14: {
        'color': 'text-green-500 font-bold rounded-md',
        'text': 'Resuelta',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    },
}

const STATUS = [
    { value: "10", label: 'Pendiente' },
    { value: "12", label: 'En progreso' },
    { value: "14", label: 'Resuelta' },
];

const badgeClassPriority = {
    1: {
        'color': 'bg-red-200 text-red-500 font-bold rounded-md',
        'text': 'Roja ',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>,
    },
    2: {
        'color': 'bg-yellow-300 text-black font-bold rounded-md',
        'text': 'Amarilla',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>,
    },
    3: {
        'color': 'bg-orange-200 text-orange-500 rounded-md',
        'text': 'Naranja',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>,
    },
    4: {
        'color': 'bg-blue-200 text-blue-500 rounded-md',
        'text': 'Azul',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>,
    },
}

const PRIORITY = [
    { value: "1", label: 'Roja' },
    { value: "2", label: 'Amarilla' },
    { value: "3", label: 'Naranja' },
    { value: "4", label: 'Azul' },
]

export default function Clients() {

    const { fetchAlerts } = useData()
    const { status } = useSession();
    const [data, setData] = useState()
    const router = useRouter();

    const columns = [
        {
            accessorKey: 'telegram_contact.full_name',
            header: 'Contacto',
            size: 40
        },
        {
            accessorKey: 'alert_time',
            header: 'Fecha, hora',
            size: 200
        },
        {
            accessorKey: 'status',
            header: 'Estado',
            Cell: ({ cell }) => (
                <span className={`${badgeClassStatus[cell.getValue()].color} flex items-center w-30 h-8 gap-1`}>
                    {badgeClassStatus[cell.getValue()].icon}
                    {badgeClassStatus[cell.getValue()].text}
                </span>
            ),
            size: 40,
            filterVariant: 'select',
            filterSelectOptions: STATUS,
            filterFn: 'equals',
        },
        {
            accessorKey: 'priority',
            header: 'Alerta',
            Cell: ({ cell }) => (
                <span className={`${badgeClassPriority[cell.getValue()]?.color} flex items-center justify-center rounded-xl gap-2 w-auto h-8 px-2`}>
                    {badgeClassPriority[cell.getValue()]?.icon}
                    {badgeClassPriority[cell.getValue()]?.text}
                </span>
            ),
            size: 40,
            filterVariant: 'select',
            filterSelectOptions: PRIORITY,
            filterFn: 'equals',
        },
        {
            accessorKey: 'telegram_contact.group',
            header: 'Grupo',
            size: 40
        },
        {
            accessorKey: 'telegram_contact.area',
            header: 'Comuna',
            size: 40
        }

    ]

    const acciones = [
        {
            name: 'Mapa',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
            </svg>
            ,
            action: (row) => {
                const idAlerta = row.id
                router.push(`/alerts/${idAlerta}`)
            }
        }
    ]

    return (
        <>

            <div className='grid place-content-center p-8'>

                <div className='font-bold'>
                    Centro de alertas
                </div>

                <Conteo_Alertas />

                <div className="w-300">
                    <MyTable columns={columns} acciones={acciones} crud={[]} opciones={{ bd: true }} getInfo={(val) => { return fetchAlerts(val) }} />
                </div>
            </div>
        </>
    )
}

