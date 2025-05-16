'use client';
import React, { useEffect, useState } from 'react'
import { useData } from '@/context/DataContext'
import { useSession } from 'next-auth/react';
import MyTable from '@/components/table';
import { useRouter } from "next/navigation";
import Conteo_Alertas from '@/components/ui/conteo_alertas';

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

            <div className='grid place-content-center p-8'>

                <div className='font-bold'>
                    Centro de alertas
                </div>

                <Conteo_Alertas />

                <div className="w-300">
                    {data && <MyTable columns={columns} acciones={acciones} crud={[]} opciones={{ bd: false, data: data }} />}
                </div>
            </div>
        </>
    )
}

