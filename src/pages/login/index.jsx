import { View } from '@tarojs/components';
import { Input } from '@/components';
import { AtButton } from 'taro-ui';
import Func from '@/utils/Func';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import Tips from '@/utils/tips';
import { setToken, encryptPassword, setCurrentUser } from '@/utils/authTools';
import { login, getPublicKey } from '@/services/user';
import './index.scss';

const Login = (props) => {
    const { token } = props;
    const [params, setParams] = useState({
        phoneNumber: '15655867638',
        password: '123456'
    });
    const [remember, setRemember] = useState([
        {
            value: 'type01',
            label: '记住密码',
            checked: false
        }
    ]);

    const changeValue = (type, value) => {
        setParams({
            ...params,
            [type]: value
        });
    };

    const onLogin = async () => {
        const { phoneNumber, password } = params;
        if (!phoneNumber?.trim()) return Tips.toast('请输入手机号');
        if (!Func.checkRegStr(phoneNumber).isTelephone) return Tips.toast('手机号格式不正确');
        if (!password?.trim()) return Tips.toast('请输入密码');
        Tips.loading('loading...', true)
        const keyRes = await getPublicKey();
        if (keyRes?.code == 200) {
            const loginRes = await login({
                phoneNumber: phoneNumber,
                password: encryptPassword(keyRes?.data, password)
            });
            if (loginRes?.code == 200) {
                setToken(loginRes?.data?.token)
                setCurrentUser({
                    phoneNumber,
                    username: loginRes?.data?.username
                })
                Taro.switchTab({
                    url: '/pages/home/index'
                });
            }
        }
        Tips.loading('loading...', false)
    };

    return (
        <View
            style={Func.getStyles({
                width: '100%',
                height: '100vh',
                backgroundImage: `url(https://energy.sermatec-cloud.com/file/D6tZBPGpB_dN_tRyFbDO.png)`,
                backgroundSize: 'cover',
                color: token.color
            })}
            className="login"
        >
            <View
                style={Func.getStyles({
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'calc(100% - 100px)'
                })}
            >
                <Input
                    value={params.phoneNumber}
                    name="phoneNumber"
                    placeholder="请输入手机号"
                    type="phone"
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '6rpx',
                        paddingLeft: '10rpx',
                        paddingRight: '10rpx'
                    }}
                    onChange={(value) => {
                        changeValue('phoneNumber', value);
                    }}
                />
                <Input
                    value={params.password}
                    name="password"
                    placeholder="请输入密码"
                    type="password"
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '6rpx',
                        paddingLeft: '10rpx',
                        paddingRight: '10rpx',
                        marginTop: '10rpx'
                    }}
                    onChange={(value) => {
                        changeValue('password', value);
                    }}
                />
                <View
                    style={Func.getStyles({
                        display: 'flex',
                        'justify-content': 'flex-end',
                        marginTop: '30px'
                    })}
                >
                    {/* <Checkbox options={remember} token={token} onChange={(remember) => setRemember(remember)} /> */}
                    <View
                        style={Func.getStyles({
                            color: token.colorPrimary
                        })}
                        onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/forgotPassword/index'
                            });
                        }}
                    >
                        忘记密码
                    </View>
                </View>
                <View
                    style={Func.getStyles({
                        margin: '30px 0'
                    })}
                >
                    <AtButton type="primary" onClick={onLogin}>
                        登录
                    </AtButton>
                </View>
                <View
                    style={Func.getStyles({
                        color: token.colorPrimary,
                        'text-align': 'center'
                    })}
                    onClick={() => {
                        Taro.navigateTo({
                            url: '/pages/register/index'
                        });
                    }}
                >
                    去注册
                </View>
            </View>
        </View>
    );
};

export default Login;
