import {getLocalStorage} from './index'

export const ajax = {
    get: getAjax,
    post: sendJSON,
    postMulti: sendMulti,
    patch: async (apiPath, values, token=null) => (
        await sendJSON(apiPath, values, token, 'PATCH')
    ),
    patchMulti: async (apiPath, values, fileKeysArray, token=null) => (
        await sendMulti(apiPath, values, fileKeysArray, token, 'PATCH')
    ),
    delete: deleteAjax 
}

const baseURL = process.env.REACT_APP_API_BASE;

export async function sendMulti(apiPath, values, fileKeysArray, token=null, method='POST') {
    const authHeader = token ? { authorization: `Bearer ${token}` } : null;
    const formData = new FormData();
    const stringified = {};
    fileKeysArray.forEach(fileKey => formData.append(fileKey, values[fileKey]));
    for(let key in values) {
        if (!fileKeysArray.includes(key)) stringified[key] = values[key];
    }
    formData.append('formJSON', JSON.stringify(stringified));
    try {
        const res = await fetch(baseURL + apiPath, { 
            method: method, 
            body: formData,
            headers: { ...authHeader }
        });
        return await res.json();
    } catch(err) {
        return { error: err.message }
    }
}

export async function sendJSON(apiPath, values, token=null, method='POST') {
    const authHeader = token ? { authorization: `Bearer ${token}` } : null;
    try {
        const res = await fetch(baseURL + apiPath, { 
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

export async function getAjax(apiPath, token=null) {
    const authHeader = token ? { authorization: `Bearer ${token}` } : null;
    try {
        const res = await fetch(baseURL + apiPath, { 
            headers: { 
                ...authHeader
            } 
        });
        return await res.json();
    } catch(err) {
        return { error: err.message }
    }
}

export async function deleteAjax(apiPath, token=null) {
    const authHeader = token ? { authorization: `Bearer ${token}` } : null;
    try {
        const res = await fetch(baseURL + apiPath, { 
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

