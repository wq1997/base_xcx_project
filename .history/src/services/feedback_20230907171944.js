import { request } from '@/utils/request';

export const getNotification = (params) => {
    const { current, size } = params;
    return request('/feedback/obtainedFeedbackType', {
        method: 'GET'
    });
};
