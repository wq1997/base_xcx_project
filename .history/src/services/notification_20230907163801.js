import { request } from '@/utils/request';

export const getNotification = (params) => {
    const { current, size, name } = params;
    return request(`/policy/obtainedInformPage?current=${current}&size=${size}&name=${name}`, {
        method: 'GET'
    });
};
