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
