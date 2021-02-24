export function getLocalStorage(key) {
    try {
        const storedItem = localStorage.getItem(key);
        return storedItem ? JSON.parse(storedItem) : undefined;
    } catch(err) {
        return undefined;
    }
}
export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch(err) {
        console.log(err.message);
    }
}

export function convertToSlug(str) {
    return str.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +|_/g,'-');
}

export function convertToQueryString(str) {
    return str.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +|_/g,'+');
}

export const transformImg = (originalURL, transformation) => {
    if (!originalURL || !transformation) return null;
    const split = originalURL.split('/');
    split[6] = transformation;
    return split.join('/')
}