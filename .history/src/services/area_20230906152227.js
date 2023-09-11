import { request } from '@/utils/request';

export const getPolicyList = (params) => {
    const { current, size, name } = params;
    return request('/district/obtainedFirstLevelDistrictList', {
        method: 'GET'
    });
};
