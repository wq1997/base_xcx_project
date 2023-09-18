import { request } from '@/utils/request';

export const getElectricType = (params) => {
    return request('/open/obtainedElectricTypeBy', {
        method: 'POST',
        body: params
    });
};

export const getBillingSystem = (params) => {
    return request('/open/obtainedBillingSystemBy', {
        method: 'POST',
        body: params
    });
};

export const getVolLevel = (params) => {
    return request('/open/obtainedVoltageLevelListBy', {
        method: 'POST',
        body: params
    });
};

export const getElectricPrice = (params) => {
    return request('/electricityPrice/obtainedOneElectricity', {
        method: 'POST',
        body: params
    });
};
