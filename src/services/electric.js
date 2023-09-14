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

export const getVolLevel = () => {
    return request('/dataType/obtainedVoltageLevelList', {
        method: 'GET'
    });
};

export const getElectricPrice = (params) => {
    return request('/electricityPrice/obtainedOneElectricity', {
        method: 'POST',
        body: params
    });
};