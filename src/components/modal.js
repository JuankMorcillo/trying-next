import React from 'react'

export default function Modal({ options }) {

    return (
        <div
            style={{ display: options.open ? 'flex' : 'none' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
        >
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 flex flex-col items-center">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:pointer cursor-pointer"
                    onClick={options.onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-bold mb-4">{options.title}</h2>
                <div className="w-full">
                    {options.content}
                </div>
            </div>
        </div>
    )
}
