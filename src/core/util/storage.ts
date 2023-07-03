import Cookies from 'js-cookie';

export function setItem(key, value) {
    return Cookies.set(key, value);
}

export async function getItem(key) {
    try {
        const data = await Cookies.get(key);
        if (data) {
            return data;
        }
        return null;
    } catch {
        Cookies.remove(key);
    }
    return await Cookies.get(key);
}

export function removeItem(key) {
    return Cookies.remove(key);
}
