import { request } from '@/utils/request';

export const getElectricType = () => {
    return request('/dataType/obtainedElectricTypeList', {
        method: 'GET'
    });
};
