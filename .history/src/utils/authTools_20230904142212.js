import WxmpRsa from 'wxmp-rsa';
import { clearAllItems, getItem, setItem } from '@/utils/storage';

export function getToken() {
    return getItem('cet-token') || '';
}

export function setToken(token) {
    setItem('cet-token-token', token);
}

export function setCurrentUser(account) {
    setItem('cet-current-user', JSON.stringify(account));
}

export function getCurrentUser() {
    return getItem('cet-current-user');
}

export function removeAll() {
    clearAllItems();
}

export function encryptPassword(publicKey, password) {
    console.log(publicKey, password);
    encryptor.setPublicKey(publicKey);
    console.log('----', encryptor.encryptLong(password));
    return encryptor.encryptLong(password);
}
