import { request } from '@/utils/request';

export const getFirstArea = () => {
    return request('/inform/obtainedInformPage', {
        method: 'GET'
    });
};
