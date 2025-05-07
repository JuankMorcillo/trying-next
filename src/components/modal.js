import React from 'react'

export default function Modal({ options }) {
    return (
        <>

            <div className="fixed inset-y-1 right-0 left-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">{options.title}</h2>
                    {options.content}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
                </div>
            </div>

        </>
    )
}
