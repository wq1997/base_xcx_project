import { View } from '@tarojs/components';
import { Checkbox } from "@/components"
import { AtButton, AtInput } from 'taro-ui'
import Func from "@/utils/Func";
import { useState } from "react";
import Taro from "@tarojs/taro";
import Tips from "@/utils/tips";
import { 
    login as loginServe
} from "@/services/user";

import "./index.scss";

const Login = (props) => {
    const { token } = props;
    const [ params, setParams] = useState({
        telephone: '',
        password: ''
    });
    const [remember, setRemember]= useState([
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
        if(!params.telephone){
            Tips.toast("请输入手机号")
            return;
        }
        if(!params.password){
            Tips.toast("请输入密码")
            return;
        }
        const res = await loginServe(params);
        if(res){
            Taro.switchTab({
                url: '/pages/home/index'
            })
        }
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
                <AtInput 
                    value={params.telephone}
                    name='telephone' 
                    placeholder='请输入手机号' 
                    type="phone" 
                    onChange={value=>changeValue('telephone', value)}
                />
                <AtInput 
                    value={params.password}
                    name='password' 
                    placeholder='请输入密码' 
                    type='password'
                    onChange={value=>changeValue('password', value)} 
                />
                <View
                    style={Func.getStyles({
                        display: 'flex',
                        'justify-content': 'space-between'
                    })}
                >
                    <Checkbox options={remember} token={token} onChange={(remember)=>setRemember(remember)} />
                    <View
                        style={Func.getStyles({
                           color: token.colorPrimary
                        })}
                        onClick={()=>{
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
                    onClick={()=>{
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