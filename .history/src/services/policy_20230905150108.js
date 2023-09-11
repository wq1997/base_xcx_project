import { request } from '@/utils/request';

export const getPolicyList = (params) => {
    const { current, size } = params;
    return request(`/policy/obtainedPolicyPage?current=${current}&size=${size}`, {
        method: 'GET'
    });
};
