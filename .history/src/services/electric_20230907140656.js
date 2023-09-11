import { request } from '@/utils/request';

export const getElectricType = () => {
    return request('/dataType/obtainedElectricTypeList', {
        method: 'GET'
    });
};

export const getBillingSystem = () => {
    return request('/dataType/obtainedBillingSystemList', {
        method: 'GET'
    });
};

export const getVolLe = () => {
    return request('/dataType/obtainedVoltageLevelList', {
        method: 'GET'
    });
};