import { request } from '@/utils/request';

export const getFirstArea = () => {
    return request('/dataType/obtainedElectricTypeList', {
        method: 'GET'
    });
};
