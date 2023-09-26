import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components';
import { connect } from 'react-redux';
import Func from '@/utils/Func';
import { PUBLIC_FILE_PATH } from '@/utils/constants';
import Taro from '@tarojs/taro';

const homeList = [
    {
        icon: 'electricityPrice.svg',
        href: '/pages/electricityPrice/index',
        title: '电价'
    },
    {
        icon: 'policy.svg',
        href: '/pages/policy/index',
        title: '市场政策'
    },
    {
        icon: 'investment.svg',
        href: '/pages/investment/index',
        title: '投资测算'
    },
    {
        icon: 'standard.svg',
        href: '/pages/standard/index',
        title: '标准'
    }
];

const banners = [
    {
        src: `${PUBLIC_FILE_PATH}min-home-3.png`
    },
    {
        src: `${PUBLIC_FILE_PATH}min-home-2.png`
    },
    {
        src: `${PUBLIC_FILE_PATH}min-home-1.png`
    },
    {
        src: `${PUBLIC_FILE_PATH}min-home-4.png`
    }
];

const Home = (props) => {
    const { token } = props;

    return (
        <View
            style={Func.getStyles({
                height: 'calc(100vh - 48px)',
                background: token.backgroundColor,
                color: token.color,
                padding: '24px',
                position: 'relative',
                'overflow-x': 'hidden'
            })}
        >
            <View
                style={Func.getStyles({
                    width: '100%',
                    height: '400px',
                    position: 'absolute',
                    background: token.colorPrimary,
                    top: 0,
                    left: 0
                })}
            >
                <View
                    style={Func.getStyles({
                        width: '100%',
                        height: '300px',
                        position: 'absolute',
                        background: token.colorPrimary,
                        bottom: '-140px',
                        left: 0,
                        'border-radius': '50%'
                    })}
                ></View>
            </View>
            <Image
                src={`${PUBLIC_FILE_PATH}home_company_1.svg`}
                style={Func.getStyles({
                    position: 'absolute',
                    height: '120px',
                    top: 0,
                    width: 'calc(100% - 48px)'
                })}
            />
            <View
                style={Func.getStyles({
                    width: 'calc(100% - 48px)',
                    position: 'absolute',
                    top: '120px'
                })}
            >
                <View
                    style={Func.getStyles({
                        display: 'grid',
                        'grid-template-columns': 'repeat(2, 1fr)',
                        'text-align': 'center',
                        gap: '20px'
                    })}
                >
                    {homeList.map((home) => {
                        return (
                            <View
                                style={Func.getStyles({
                                    border: `1px solid ${token.colorBorder}`,
                                    padding: '60px 40px',
                                    'border-radius': '20px',
                                    backgroundColor: '#fffffff2'
                                })}
                                onTap={() => {
                                    Taro.navigateTo({
                                        url: home.href
                                    });
                                }}
                            >
                                <View
                                    style={Func.getStyles({
                                        'margin-bottom': '20px'
                                    })}
                                >
                                    <Image
                                        src={`${PUBLIC_FILE_PATH}${home.icon}`}
                                        style={Func.getStyles({
                                            width: '120px',
                                            height: '120px'
                                        })}
                                    />
                                </View>
                                <View
                                    style={Func.getStyles({
                                        'font-size': '30px',
                                        'font-weight': 'bold'
                                    })}
                                >
                                    {home.title}
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View
                    style={Func.getStyles({
                        marginTop: '40px'
                    })}
                >
                    <Swiper
                        indicatorColor="#999"
                        indicatorActiveColor="#333"
                        circular
                        indicatorDots
                        style={Func.getStyles({
                            height: '400px',
                            'box-shadow': '0px 10px 10px rgba(0,0,0,0.2)',
                            background: 'transparent',
                            'border-radius': '20px'
                        })}
                        autoplay
                    >
                        {banners.map((banner) => {
                            return (
                                <SwiperItem key={banner.src}>
                                    <Image
                                        src={banner.src}
                                        style={Func.getStyles({
                                            width: '100%',
                                            height: '100%',
                                            'object-fit': 'contain'
                                        })}
                                    />
                                </SwiperItem>
                            );
                        })}
                    </Swiper>
                </View>
            </View>
        </View>
    );
};

export default connect(({ user }) => ({
    user
}))(Home);
