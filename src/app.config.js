export default {
    pages: [
        'pages/home/index',
        'pages/login/index',
        'pages/register/index',
        'pages/forgotPassword/index',
        'pages/electricityPrice/index',
        'pages/investment/index',
        'pages/investResult/index',
        'pages/standard/index',
        'pages/policy/index',
        'pages/policyDetail/index',
        'pages/outer/index',
        'pages/notification/index',
        'pages/feedback/index',
        'pages/mine/index',
        'pages/mineCenter/index',
        'pages/test/index'
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#3560EA',
        navigationBarTitleText: '采e通',
        navigationBarTextStyle: 'white',
        enablePullDownRefresh: false
    },
    tabBar: {
        selectedColor: '#47AEE3',
        list: [
            {
                text: '首页',
                pagePath: 'pages/home/index',
                iconPath: './assets/images/home.jpg',
                selectedIconPath: './assets/images/home.jpg'
            },
            {
                text: '我的',
                pagePath: 'pages/mine/index',
                iconPath: './assets/images/user.jpg',
                selectedIconPath: './assets/images/user.jpg'
            }
        ]
    }
};
