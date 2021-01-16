export function getLocalStorage(key) {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : undefined;
}
export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
