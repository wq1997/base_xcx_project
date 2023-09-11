import { request } from '@/utils/request';

export const getFirstArea = () => {
    return request('/district/obtainedFirstLevelDistrictList', {
        method: 'GET'
    });
};

export const getSecondArea = () => {
    return request('/district/obtainedFirstLevelDistrictList', {
        method: 'GET'
    });
};