import {getLocalStorage} from './index'

const baseURL = process.env.REACT_APP_API_BASE;

export async function sendMulti(apiPath, values, fileKeysArray) {
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
            headers: { Authorization: `Bearer ${getLocalStorage('accessToken')}` }
        });
        const data = await res.json();
        if (res.status < 200 || res.status > 299) throw new Error(data.message);
        return { data: data }
    } catch(err) {
        return { error: err.message }
    }
}

export async function sendJSON(apiPath, values) {
    try {
        const res = await fetch(baseURL + apiPath, { 
            method: 'POST', 
            body: JSON.stringify(values),
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${getLocalStorage('accessToken')}`
            } 
        });
        const data = await res.json();
        if (res.status < 200 || res.status > 299) throw new Error(data.message);
        return { data: data }
    } catch(err) {
        return { error: err.message }
    }
}


//localStorage setItem (token, res.token);
//