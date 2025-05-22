'use client';

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useData } from '@/context/DataContext';

const statusMap = {
    10: {
        'color': 'text-red-500',
        'text': 'Pendiente',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    },
    12: {
        'color': 'text-green-500',
        'text': 'Activa',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    },
    14: {
        'color': 'text-black-500',
        'text': 'Cerrada',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
        </svg>
    }
}

export default function Conteo_Alertas() {

    const { fetchAlertCount } = useData()
    const { status } = useSession();
    const [data, setData] = useState()

    const handleFetchAlerts = async () => {
        const data = await fetchAlertCount()
        setData(data)
    }

    useEffect(() => {
        if (status === 'authenticated') {
            handleFetchAlerts();
        }
    }, [status]);

    return (
        <>

            <div className='flex items-stretch gap-2'>

                {data && data.map((item, index) => (

                    <button key={index} className={`flex gap-2 py-2 px-4 w-45 h-12 items-center hover:bg-gray-300 bg-white shadow-lg ${statusMap[item['status']].color} rounded-full`}>
                        <span className='text-sm font-semibold p-2'>{item['count']}</span>
                        <div className='flex gap-1 items-center'>
                            <span>{statusMap[item['status']].icon}</span>
                            <span>{statusMap[item['status']].text}</span>
                        </div>
                    </button>

                ))}

            </div>

        </>
    )
}
