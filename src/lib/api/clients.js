import { fetchAPI } from './config';


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