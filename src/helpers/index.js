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

export function formatDate(date) {
    let diff = new Date() - date;
    let diffSecs = Math.floor(diff/1000);
    if (diffSecs < 60) return "just now";

    let diffMins = Math.floor(diffSecs/60);
    if (diffMins < 60) return `${diffMins} min. ago`;
    
    let diffHours = Math.floor(diffMins/60);
    if (diffHours <= 4) return `${diffHours} hrs. ago`;

    date = date.toDateString().split(' '); //e.g. ['Thu', 'Jan', '01', '1970']

    // let day = (shortDay) => {
    //     switch(shortDay) {
    //         case "Mon": return "Monday,";
    //         case "Tue": return "Tuesday,";
    //         case "Wed": return "Wednesday,";
    //         case "Thu": return "Thursday,";
    //         case "Fri": return "Friday,";
    //         case "Sat": return "Saturday,";
    //         case "Sun": return "Sunday,";
    //     }
    // }

    return `${date[1]}. ${date[2]}`
}