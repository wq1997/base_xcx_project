import { request } from '@/utils/request';

export const getPolicyList = (params) => {
    const { current, size,name } = params;
    return request(`/policy/obtainedPolicyPageBy?current=${current}&size=${size}&size=${size}`, {
        method: 'GET'
    });
};
