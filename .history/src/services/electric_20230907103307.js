import { request } from '@/utils/request';

export const getElectricType = () => {
    return request('/dataType/obtainedElectricTypeList', {
        method: 'GET'
    });
};

export const getBilling system= () => {
    return request('/dataType/obtainedBillingSystemList', {
        method: 'GET'
    });
};