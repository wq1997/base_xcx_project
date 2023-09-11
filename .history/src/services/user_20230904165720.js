import { request } from '@/utils/request';

export const getUserInfo = (params) => {
    return request('/wangqing/user', {
        method: 'GET',
        body: params
    });
};

export const getPublicKey = () => {
    return request('/open/getPublicKey', {
        method: 'get'
    });
};

export const login = (params) => {
    return request('/open/login', {
        method: 'POST',
        body: params
    });
};

export const register = (params) => {
    return request('/open/register', {
        method: 'POST',
        body: params
    });
};

export const forgotPassword = (params) => {
    return request('/open/register', {
        method: 'POST',
        body: params
    });
};
