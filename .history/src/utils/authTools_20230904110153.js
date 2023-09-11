import {clearAllItems, getItem, setItem} from "@/utils/storage"

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
  return getItem('cet-current-user')
}

export function removeAll() {
  clearAllItems()
}

export 
