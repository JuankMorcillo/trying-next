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

export async function getAlerts(token, params) {

    return fetchAPI('/alerts/', {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + token,
        },
        params: {
            ...params
        }
    });
}

export async function getAlertById(token, id) {
    return fetchAPI('/alerts/' + id, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + token
        },
    });
}

export async function getAlertCount(token) {
    return fetchAPI('/alerts/alertCount', {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + token
        },
    });
}