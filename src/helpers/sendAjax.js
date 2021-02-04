import {getLocalStorage} from './index'

const baseURL = process.env.REACT_APP_API_BASE;

export async function sendMulti(apiPath, values, fileKeysArray, token=null) {
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
            method: 'POST', 
            body: formData,
            headers: { ...authHeader }
        });
        return await res.json();
    } catch(err) {
        return { error: err.message }
    }
}

export async function sendJSON(apiPath, values, token=null) {
    const authHeader = token ? { authorization: `Bearer ${token}` } : null;
    try {
        const res = await fetch(baseURL + apiPath, { 
            method: 'POST', 
            body: JSON.stringify(values),
            headers: { 
                'Content-Type': 'application/json', 
                ...authHeader
            } 
        });
        return await res.json();
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

export const ajax = {
    get: getAjax,
    post: sendJSON,
    postMulti: sendMulti,
    delete: deleteAjax 
}