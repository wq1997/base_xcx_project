import { request } from '@/utils/request';

export const getNotification = (params) => {
    const { current, size } = params;
    return request(`/policy/obtainedInformPage?current=${current}&size=${size}`, {
        method: 'GET'
    });
};
