import { request } from '@/utils/request';

export const getPolicyList = (params) => {
    const { current, size, name } = params;
    return request(`/district/obtainedFirstLevelDistrictPage?current=${current}&size=${size}&name=${name}`, {
        method: 'GET'
    });
};
