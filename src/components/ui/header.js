import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react'

function stringToColor(str) {
    // Simple hash to generate a color from a string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Convert hash to hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
}

function getInitials(nombres, apellidos) {
    const n = nombres ? nombres.trim().split(' ')[0][0] : '';
    const a = apellidos ? apellidos.trim().split(' ')[0][0] : '';
    return (n + a).toUpperCase();
}

export default function Header() {

    const { data: session, status } = useSession();
    const nombres = session?.user?.nombres || '';
    const apellidos = session?.user?.apellidos || '';
    const initials = getInitials(nombres, apellidos);
    const bgColor = stringToColor(nombres + apellidos);
    const [open, setOpen] = useState(false)
    const modalRef = useRef(null);

    const logoutIcon = {
        'name': 'logout',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: '/login' });
    };

    return (
        <>

            {
                session &&
                <>
                    <header>
                        <nav className="bg-white-800 p-4 shadow-md">
                            <div className="grid grid-cols-2 gap-4 place-content-between">
                                <div className="flex items-center">
                                    <h1 className="text-xl font-bold text-black-500">Comunidad segura</h1>
                                </div>

                                <div className="flex text-black-500 gap-3 place-content-end items-center">
                                    <div>
                                        Bienvenido, {session?.user?.nombres} {session?.user?.apellidos}
                                    </div>
                                    <button
                                        className="w-10 h-10 cursor-pointer rounded-full text-white font-bold text-lg shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                                        style={{ backgroundColor: bgColor }}
                                        title={nombres + ' ' + apellidos}
                                        onClick={() => setOpen(true)}
                                    >
                                        {initials}
                                    </button>

                                </div>
                            </div>
                        </nav>
                    </header>
                    {open && (
                        <div
                            ref={modalRef}
                            className="absolute right-0 mt-2 z-50 bg-white rounded-lg shadow-lg p-4 min-w-[180px] flex flex-col items-center animate-fade-in"
                        >
                            <span className="text-lg font-semibold mb-2">{nombres} {apellidos}</span>
                            <button
                                className="flex place-content-center cursor-pointer w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                onClick={handleLogout}
                            >
                                {logoutIcon.icon} Logout
                            </button>
                        </div>
                    )}
                </>
            }

        </>
    )
}
