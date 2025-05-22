import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from "next/navigation";
import React from 'react'

export default function Menu_Botones() {

    const { data: session, status } = useSession();

    const router = useRouter();

    const page = usePathname();


    const opciones = [
        {
            name: 'Centro de alertas',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>,
            url: '/alerts'

        },
        {
            name: 'Mapa de alertas',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
            </svg>,
            url: '/alerts/mapa'
        }
    ]

    return (
        <>
            {
                session &&
                <div className="flex flex-row gap-3 place-content-end p-4">

                    {
                        opciones.map((opcion, index) => {
                            return (
                                <button
                                    key={index}
                                    className={`flex w-50 gap-2 ${page == opcion.url ? 'bg-white-500 border-1 border-blue-500 text-blue-500' : 'bg-blue-300 text-blue-700'} font-bold py-2 px-4 rounded-full hover:bg-blue-200 transition duration-300 ease-in-out`}
                                    onClick={() => {
                                        router.push(opcion.url)
                                    }}
                                >
                                    {opcion.icon} {opcion.name}
                                </button>
                            )
                        })
                    }

                </div>
            }
        </>
    )
}
