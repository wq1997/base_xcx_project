import { request } from '@/utils/request';

export const getNotification = () => {
    return request('/inform/obtainedInformPage', {
        method: 'POST',
        body: params
    });
};
