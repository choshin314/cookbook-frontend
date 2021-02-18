import { useSelector } from "react-redux";
import { API_BASE } from "../constants";

export default function useAjax(apiPath) {
    const auth = useSelector(state => state.auth);
    const authHeader = auth.accessToken ? { authorization: `Bearer ${auth.accessToken}` } : null;

    async function sendJSON(values, method='POST') {
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
    
    async function sendMulti(values, fileKeysArray, method='POST') {
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
    
    
    
    async function getJSON() {
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
    
    async function deleteAjax() {
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

    return {
        get: getJSON,
        post: sendJSON,
        postMulti: sendMulti,
        patch: async (values) => (
            await sendJSON(values, 'PATCH')
        ),
        patchMulti: async (values, fileKeysArray) => (
            await sendMulti(values, fileKeysArray, 'PATCH')
        ),
        deleteAjax: deleteAjax 
    }
}


