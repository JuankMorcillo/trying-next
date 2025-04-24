'use client';

import Link from 'next/link'
import React, { useEffect } from 'react'
import { useData } from '@/context/DataContext'
import { useSession } from 'next-auth/react';

export default function Clients() {

    const { fetchClients } = useData()
    const { status } = useSession();

    const handleFetchClients = async () => {
        const data = await fetchClients()
        console.log(data)
    }

    useEffect(() => {
        if (status === 'authenticated') {
            handleFetchClients();
        }
    }, [status]);

    return (
        <div>
            Clientes
            <br />
            <Link href="/clients/mapa">
                Mapa
            </Link>

        </div>
    )
}

