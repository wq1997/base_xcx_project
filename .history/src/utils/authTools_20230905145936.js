import WxmpRsa from 'wxmp-rsa';
import { clearAllItems, getItem, setItem } from '@/utils/storage';

const encryptor = new WxmpRsa();

export function getToken() {
    return getItem('cet-token') || null;
}

export function setToken(token) {
    setItem('cet-toke', token);
}

export function setCurrentUser(account) {
    setItem('cet-current-user', JSON.stringify(account));
}

export function getCurrentUser() {
    const value = getItem('cet-current-user');
    return value ? JSON.parse(value) : null;
}

export function removeAll() {
    clearAllItems();
}

export function encryptPassword(publicKey, password) {
    encryptor.setPublicKey(publicKey);
    return encryptor.encryptLong(password);
}
