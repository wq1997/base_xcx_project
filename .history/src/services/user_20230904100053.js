import { request } from '@/utils/request';

export const getUserInfo = (params) => {
    return request('/wangqing/user', {
        method: 'GET',
        body: params
    });
};

export const getPublicKey = (params) => {
    return request('/open/getPublicKey', {
        method: 'POST',
        body: params
    });
};

export const login = (params) => {
    return request('/login', {
        method: 'POST',
        body: params
    });
};
