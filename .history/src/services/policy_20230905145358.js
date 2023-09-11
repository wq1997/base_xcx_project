import { request } from '@/utils/request';

export const getUserInfo = (params) => {
    const { size	} = params
    return request(`/policy/obtainedPolicyPage?current=${current}&current=${size	}`, {
        method: 'GET'
    });
};
