import { request } from '@/utils/request';

export const getFeedbackType = () => {
    return request('/feedback/obtainedFeedbackType', {
        method: 'GET'
    });
};

export const addFeedback = (params) => {
    return request('/feedback/addFeedback', {
        method: 'POST',
        body: params
    });
};
