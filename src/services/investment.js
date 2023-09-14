import { request } from '@/utils/request';

export const calcInvestmentResult = (params) => {
    return request('/open/investmentCalculation', {
        method: 'POST',
        body: params
    });
};
