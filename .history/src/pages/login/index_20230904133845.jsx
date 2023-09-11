import { View } from '@tarojs/components';
import { Checkbox, Input } from "@/components"
import { AtButton } from 'taro-ui'
import Func from "@/utils/Func";
import { useState } from "react";
import Taro from "@tarojs/taro";
import Tips from "@/utils/tips";
import { encryptPassword } from '@/utils/authTools'
import {
    login,
    getPublicKey
} from "@/services/user";

import "./index.scss";

const Login = (props) => {
    const { token } = props;
    const [params, setParams] = useState({
        phoneNumber: '',
        password: ''
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
        })
    }

    const onLogin = async () => {
        if (!params.phoneNumber) {
            Tips.toast("请输入手机号")
            return;
        }
        if (!params.password) {
            Tips.toast("请输入密码")
            return;
        }
       try{
        const res = await getPublicKey();
       }catch(e){
        console.log(e)
       }
        console.log(res)
        if (res?.code == 200) {
            const publicKey = res?.data
            // console.log(11111)
            // return console.log(encryptPassword(publicKey, params.password))
            // const res = await login({
            //     ...params,
            // });
        }
        return
        if (res) {
            Taro.switchTab({
                url: '/pages/home/index'
            })
        }
        Taro.switchTab({
            url: '/pages/home/index'
        })
    }

    return (
        <View
            style={Func.getStyles({
                width: '100%',
                height: '100vh',
                background: token.backgroundColor,
                color: token.color
            })}
            className='login'
        >
            <View
                style={Func.getStyles({
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'calc(100% - 100px)'
                })}
            >
                <View
                    style={Func.getStyles({
                        'margin-bottom': '40px',
                        'text-align': 'center',
                        color: token.colorPrimary,
                        'font-size': '40px'
                    })}
                >
                    欢迎访问采e通
                </View>
                <Input
                    value={params.phoneNumber}
                    name='phoneNumber'
                    placeholder='请输入手机号'
                    type="number"
                    onChange={value => {
                        changeValue('phoneNumber', value);
                    }}
                />
                <Input
                    value={params.password}
                    name='password'
                    placeholder='请输入密码'
                    type='password'
                    onChange={value => {
                        changeValue('password', value);
                    }}
                />
                <View
                    style={Func.getStyles({
                        display: 'flex',
                        'justify-content': 'space-between',
                        marginTop: '48px'
                    })}
                >
                    <Checkbox options={remember} token={token} onChange={(remember) => setRemember(remember)} />
                    <View
                        style={Func.getStyles({
                            color: token.colorPrimary
                        })}
                        onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/forgotPassword/index'
                            })
                        }}
                    >
                        忘记密码
                    </View>
                </View>
                <View
                    style={Func.getStyles({
                        'margin': '60px 0'
                    })}
                >
                    <AtButton type="primary" onClick={onLogin}>登录</AtButton>
                </View>
                <View
                    style={Func.getStyles({
                        color: token.colorPrimary,
                        'text-align': 'center'
                    })}
                    onClick={() => {
                        Taro.navigateTo({
                            url: '/pages/register/index'
                        })
                    }}
                >
                    去注册
                </View>
            </View>
        </View>
    )
}

export default Login;