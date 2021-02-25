import {getLocalStorage} from './index'
import { API_BASE } from '../constants'

export const ajax = {
    get: getJSON,
    post: sendJSON,
    postMulti: sendMulti,
    patch: async (apiPath, values) => (
        await sendJSON(apiPath, values, 'PATCH')
    ),
    patchMulti: async (apiPath, values, fileKeysArray) => (
        await sendMulti(apiPath, values, fileKeysArray, 'PATCH')
    ),
    delete: deleteAjax 
}

export async function sendJSON(apiPath, values, method='POST') {
    const accessToken = getLocalStorage('auth').accessToken;
    const authHeader = accessToken ? { authorization: `Bearer ${accessToken}` } : null;
    try {
        const res = await fetch(API_BASE + apiPath, { 
            method: method, 
            body: JSON.stringify(values),
            headers: { 
                'Content-Type': 'application/json', 
                ...authHeader
            } 
        });
        const result = await res.json();
        return result;
    } catch(err) {
        return { error: err.message }
    }
}

export async function sendMulti(apiPath, values, fileKeysArray, method='POST') {
    const accessToken = getLocalStorage('auth').accessToken;
    const authHeader = accessToken ? { authorization: `Bearer ${accessToken}` } : null;
    const formData = new FormData();
    const stringified = {};
    fileKeysArray.forEach(fileKey => formData.append(fileKey, values[fileKey]));
    for(let key in values) {
        if (!fileKeysArray.includes(key)) stringified[key] = values[key];
    }
    formData.append('formJSON', JSON.stringify(stringified));
    try {
        const res = await fetch(API_BASE + apiPath, { 
            method: method, 
            body: formData,
            headers: { ...authHeader }
        });
        return await res.json();
    } catch(err) {
        return { error: err.message }
    }
}

export async function getJSON(apiPath) {
    const accessToken = getLocalStorage('auth').accessToken;
    const authHeader = accessToken ? { authorization: `Bearer ${accessToken}` } : null;
    try {
        const res = await fetch(API_BASE + apiPath, { 
            headers: { 
                ...authHeader
            } 
        });
        return await res.json();
    } catch(err) {
        return { error: err.message }
    }
}

export async function deleteAjax(apiPath) {
    const accessToken = getLocalStorage('auth').accessToken;
    const authHeader = accessToken ? { authorization: `Bearer ${accessToken}` } : null;
    try {
        const res = await fetch(API_BASE + apiPath, { 
            method: 'DELETE',
            headers: { 
                ...authHeader
            } 
        });
        return await res.json();
    } catch(err) {
        return { error: err.message }
    }
}

