'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import * as clientsAPI from '@/lib/api/clients';
import { useSession } from "next-auth/react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { data: session } = useSession();

    const fetchClients = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);            
            
            const data = await clientsAPI.getClients(session?.user?.id);
            return data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [session]);


    const value = {
        fetchClients
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};