export default {
    pages: [
        
        'pages/login/index',
        'pages/register/index',
        'pages/forgotPassword/index',
        'pages/home/index',
        'pages/test/index',
        'pages/electricityPrice/index',
        'pages/investment/index',
        'pages/investResult/index',
        'pages/policy/index',
        'pages/policyDetail/index',
        'pages/outer/index',
        'pages/notification/index',
        'pages/mine/index',
        'pages/feedback/index',
        'pages/mineCenter/index',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '采e通',
        navigationBarTextStyle: 'black',
        enablePullDownRefresh: false
    },
    tabBar: {
        selectedColor: '#255aaa',
        list: [
            {
                text: '首页',
                pagePath: 'pages/home/index',
                iconPath: './assets/images/home.png',
                selectedIconPath: './assets/images/selected_home.png'
            },
            {
                text: '我的',
                pagePath: 'pages/mine/index',
                iconPath: './assets/images/user.png',
                selectedIconPath: './assets/images/selected_user.png'
            }
        ]
    }
};
