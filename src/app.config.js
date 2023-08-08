export default {
    pages: [
        'pages/home/index',
        'pages/mine/index',
        'pages/login/index'
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '采日能源',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        selectedColor: '#6190E8',
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
