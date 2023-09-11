import { request } from '@/utils/request';

export const getFeedbackType = () => {
    return request('/feedback/obtainedFeedbackType', {
        method: 'GET'
    });
};

export const register = (params) => {
    return request('/open/register', {
        method: 'POST',
        body: params
    });
};