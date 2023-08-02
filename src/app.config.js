export default {
    pages: [
        'pages/home/index',
        'pages/login/index'
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        selectedColor: '#6190E8',
        list: [
            {
                text: '首页',
                pagePath: 'pages/home/index',
                iconPath: './assets/home.png',
                selectedIconPath: './assets/images/selected_home.png'
            },
            {
                text: '个人',
                pagePath: 'pages/login/index',
                iconPath: './assets/user.png',
                selectedIconPath: './assets/images/selected_user.png'
            }
        ]
    }
};
