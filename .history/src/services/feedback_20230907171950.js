import { request } from '@/utils/request';

export const getFeedbackType = (params) => {
    const { current, size } = params;
    return request('/feedback/obtainedFeedbackType', {
        method: 'GET'
    });
};
