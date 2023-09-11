import { request } from '@/utils/request';

export const getNotification = (params) => {
    return request('/inform/obtainedInformPage', {
        method: 'POST',
        body: params
    });
};
