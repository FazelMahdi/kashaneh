import * as CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const hash = process.env.NEXT_PUBLIC_APP_NAME;

export function encrypt(data) {
    return CryptoJS.AES.encrypt(data, hash).toString();
}

export function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, hash);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export function setItem(key, value) {
    return Cookies.set(key, encrypt(JSON.stringify(value)));
}

export async function getItem(key) {
    try {
        const data = await Cookies.get(key);
        if (data) {
            return JSON.parse(decrypt(data));
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
