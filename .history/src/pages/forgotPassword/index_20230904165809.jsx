import { View } from "@tarojs/components"
import { AtButton, AtTextarea } from 'taro-ui';
import { Input } from "@/components"
import Taro from "@tarojs/taro";
import Func from "@/utils/Func";
import { setToken, encryptPassword } from '@/utils/authTools';
import { forgotPassword } from '@/services/user';
import { useState } from "react";
import "./index.scss";

const initM = 60;
const ForgotPassword = (props) => {
    const { token } = props;
    const [data, setData] = useState({});
    const [m, setM] = useState(initM);
    const [isSendingCode, setIsSendingCode] = useState(false);

    const onChange = (type, value) => {
        setData({
            ...data,
            [type]: value
        })
    }

    const getCode = () => {
        let m = 60;
        if (!data.telephone) {
            Taro.showToast({
                icon: 'none',
                title: '请输入手机号',
                duration: 2000
            })
            return;
        }
        setIsSendingCode(true);
        let timer = setInterval(() => {
            m--;
            setM(m);
            if (m <= 0) {
                clearInterval(timer);
                setIsSendingCode(false);
                setM(initM);
            }
        }, 1000)
    }

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px',
                'margin-top': '24px'
            })}
            className="forgotPassword"
        >
            <View
                style={Func.getStyles({
                    display: 'flex',
                    'align-items': 'center'
                })}
            >
                <View
                    style={Func.getStyles({
                        flex: 1,
                        'margin-right': '20px'
                    })}
                >
                    <Input
                        name="telephone"
                        type="number"
                        placeholder='请输入手机号'
                        value={data['telephone']}
                        onChange={(value) => onChange('telephone', value)}
                    />
                </View>
                {isSendingCode ? <AtButton disabled type="primary">{m}s后重试</AtButton> : <AtButton onClick={getCode} type="primary">发送验证码</AtButton>}
            </View>
            <Input
                name="code"
                type="number"
                placeholder='请输入验证码'
                value={data['code']}
                onChange={(value) => onChange('code', value)}
            />
            <Input
                name="password"
                type="password"
                placeholder='请输入新密码'
                value={data['password']}
                onChange={(value) => onChange('password', value)}
            />
            <Input
                name="newPassword"
                type="password"
                placeholder='请输入确认新密码'
                value={data['newPassword']}
                onChange={(value) => onChange('newPassword', value)}
            />
            <View
                style={Func.getStyles({
                    'margin-top': '50px'
                })}
            >
                <AtButton
                    type="primary"
                    onClick={() => {
                        Taro.reLaunch({
                            url: '/pages/login/index'
                        })
                    }}
                >
                    重置密码
                </AtButton>
            </View>
        </View>
    )
}

export default ForgotPassword;