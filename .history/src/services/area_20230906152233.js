import { request } from '@/utils/request';

export const getPolicyList = () => {
    return request('/district/obtainedFirstLevelDistrictList', {
        method: 'GET'
    });
};
