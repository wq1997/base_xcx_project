import { request } from '@/utils/request';

export const getNotification = (params) => {
    return request('/inform/obtainedInformPage', {
        method: 'GET',
        body: params
    });
    const { current, size, name } = params;
    return request(`/policy/obtainedPolicyPageBy?current=${current}&size=${size}&name=${name}`, {
        method: 'GET'
    });
};
