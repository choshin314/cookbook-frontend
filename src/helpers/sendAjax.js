import {getLocalStorage} from './index'

const baseURL = process.env.REACT_APP_API_BASE;

export async function sendMulti(apiPath, values, fileKeysArray, token) {
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
        const data = await res.json();
        if (res.status < 200 || res.status > 299) throw new Error(data.message);
        return { data: data }
    } catch(err) {
        return { error: err.message }
    }
}

export async function sendJSON(apiPath, values, token) {
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
        const data = await res.json();
        if (res.status < 200 || res.status > 299) throw new Error(data.message);
        return { data: data }
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
        const data = await res.json();
        if (res.status < 200 || res.status > 299) throw new Error(data.message);
        return { data: data }
    } catch(err) {
        return { error: err.message }
    }
}
