'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import * as alertsAPI from '@/lib/api/alerts';
import { useSession } from "next-auth/react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recarga, setRecarga] = useState(false)
    const { data: session } = useSession();

    const fetchClients = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await alertsAPI.getClients(session?.user?.id);
            return data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [session]);

    const fetchAlerts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await alertsAPI.getAlerts(session?.user?.id);

            return data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [session]);

    const fetchAlertById = useCallback(async (id) => {
        try {
            const data = await alertsAPI.getAlertById(session?.user?.id, id);
            return data
        } catch (error) {
            setError(error.message);
        }

    }, [session]);

    const value = {
        fetchClients,
        fetchAlerts,
        fetchAlertById,
        recarga, setRecarga
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