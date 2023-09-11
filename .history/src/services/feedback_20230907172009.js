import { request } from '@/utils/request';

export const getFeedbackType = () => {
    return request('/feedback/obtainedFeedbackType', {
        method: 'GET'
    });
};
