import { request } from '@/utils/request';

export const getNotification = (params) => {
    return request('/inform/obtainedInformPage', {
        method: 'GET',
        body: params
    });
};
