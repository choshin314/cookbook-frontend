import {getLocalStorage, setLocalStorage} from './index'
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
    try {
        let result = await mainRequestJSON(apiPath, values, method);
        if (result.error && result.error === 'token expired') {
            const refreshed = await attemptRefresh();
            if (refreshed) {
                result = await mainRequestJSON(apiPath, values, method);
            }
        }
        return result;
    } catch(err) {
        return { error: err.message }
    }
}

export async function sendMulti(apiPath, values, fileKeysArray, method='POST') {
    const formData = new FormData();
    const stringified = {};
    fileKeysArray.forEach(fileKey => formData.append(fileKey, values[fileKey]));
    for(let key in values) {
        if (!fileKeysArray.includes(key)) stringified[key] = values[key];
    }
    formData.append('formJSON', JSON.stringify(stringified));
    try {
        let result = await mainRequestMulti(apiPath, formData, method)
        if (result.error && result.error === 'token expired') {
            const refreshed = await attemptRefresh();
            if (refreshed) {
                result = await mainRequestMulti(apiPath, formData, method);
            }
        }
        return result;
    } catch(err) {
        return { error: err.message }
    }
}

export async function getJSON(apiPath) {
    try {
        let result = await mainRequestGet(apiPath);
        if (result.error && result.error === 'token expired') {
            const refreshed = await attemptRefresh();
            if (refreshed) {
                result = await mainRequestGet(apiPath);
            }
        }
        return result;
    } catch(err) {
        return { error: err.message }
    }
}

export async function deleteAjax(apiPath, values) {
    try {
        let result = await mainRequestJSON(apiPath, values, 'DELETE');
        if (result.error && result.error === 'token expired') {
            const refreshed = await attemptRefresh();
            if (refreshed) {
                result = await mainRequestJSON(apiPath, values, 'DELETE');
            }
        }
        return result;
    } catch(err) {
        return { error: err.message }
    }
}

const getAccessToken = () => getLocalStorage('accessToken')

const getRefreshToken = () => getLocalStorage('refreshToken')

const getAuthHeader = () => {
    const accessToken = getAccessToken();
    return accessToken ? { authorization: `Bearer ${accessToken}` } : null;
}

const mainRequestGet = async (apiPath) => {
    const response = await fetch(API_BASE + apiPath, { 
        headers: { ...getAuthHeader() } 
    });
    return await response.json();  
}

const mainRequestJSON = async (apiPath, values, method) => {
    const response = await fetch(API_BASE + apiPath, { 
        method: method, 
        body: JSON.stringify(values),
        headers: { 
            'Content-Type': 'application/json', 
            ...getAuthHeader()
        } 
    });
    return await response.json();
}

const mainRequestMulti = async (apiPath, formData, method) => {
    const response = await fetch(API_BASE + apiPath, { 
        method: method, 
        body: formData,
        headers: { ...getAuthHeader() }
    });
    return await response.json();
}

const attemptRefresh = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;
    const refreshResponse = await fetch(API_BASE + '/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: { 'Content-Type': 'application/json'}
    })
    const { data: newAccessToken, error: refreshError } = await refreshResponse.json();
    if (refreshError) return null;
    setLocalStorage('accessToken', newAccessToken);
    return true;
}