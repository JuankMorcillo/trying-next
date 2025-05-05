import { fetchAPI } from './config';
import alertsData from '../utils/fakeData/alerts.json';

export async function getClients(token) {
    return fetchAPI('/ordenes/1', {
        headers: {
            Authorization: 'bearer ' + token
        },
    });
}

export async function getClientById(id) {
    return fetchAPI(`/clients/${id}`);
}

export async function createClient(data) {
    return fetchAPI('/clients', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getAlerts(token) {
    const alerts = await alertsData;
    return alerts;
}

export async function getAlertById(token, id) {
    const alerts = await alertsData;
    const alert = alerts.alerts.find((alert) => alert.id === Number(id));
    return alert;
}