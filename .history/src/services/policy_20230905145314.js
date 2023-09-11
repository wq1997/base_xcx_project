import { request } from '@/utils/request';

export const getUserInfo = (params) => {
    return request('/policy/obtainedPolicyPage', {
        method: 'GET'
    });
};
