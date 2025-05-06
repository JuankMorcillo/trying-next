'use client';
import React, { useEffect, useState } from 'react'
import { useData } from '@/context/DataContext'
import { useSession } from 'next-auth/react';
import MyTable from '@/components/ui/table';
import { useRouter } from "next/navigation";

export default function Clients() {

    const { fetchAlerts } = useData()
    const { status } = useSession();
    const [data, setData] = useState()
    const router = useRouter();

    const columns = [
        {
            accessorKey: 'id',
            header: '#',
            size: 40
        },
        {
            accessorKey: 'contact.firstName',
            header: 'Contacto',
            size: 40
        },
        {
            accessorKey: 'alertTime',
            header: 'Fecha, hora',
            size: 40
        },
        {
            accessorKey: 'status',
            header: 'Estado',
            size: 40
        },
        {
            accessorKey: 'priority',
            header: 'Alerta',
            size: 40
        },

    ]

    const iconos = [
        {
            'name': 'alerta',
            'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        },
        {
            'name': 'activa',
            'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        },
        {
            'name': 'resuelto',
            'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>

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

    const handleFetchAlerts = async () => {
        const data = await fetchAlerts()
        setData(data.alerts)
    }

    useEffect(() => {
        if (status === 'authenticated') {
            handleFetchAlerts();
        }
    }, [status]);

    return (
        <>

            <div className='grid place-content-center h-full'>

                <div>
                    Centro de Alertas
                </div>

                <div className='flex items-stretch'>

                    <button className='flex w-50 items-center hover:bg-gray-300 bg-gray-100 text-red-500 rounded-full px-3 py-2'>
                        <span>{iconos[0]['icon']}</span>
                        <span>Alertas Activas</span>
                    </button>

                    <button className='flex w-50 items-center hover:bg-gray-300 bg-gray-100 text-green-500 rounded-full px-3 py-2'>
                        <span>{iconos[1]['icon']}</span>
                        <span>Activa</span>
                    </button>

                    <button className='flex w-50 items-center hover:bg-gray-300 bg-gray-100 text-black-500 rounded-full px-3 py-2'>
                        <span>{iconos[2]['icon']}</span>
                        <span>Resuelto</span>
                    </button>

                </div>

                <div className="w-300">
                    {data && <MyTable columns={columns} acciones={acciones} crud={[]} opciones={{ bd: false, data: data }} />}
                </div>
            </div>
        </>
    )
}

