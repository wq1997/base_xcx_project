import { View } from "@tarojs/components"
import { AtButton, AtTextarea } from 'taro-ui';
import { Input } from "@/components"
import Taro from "@tarojs/taro";
import Func from "@/utils/Func";
import Tips from '@/utils/tips';
import { encryptPassword } from '@/utils/authTools';
import { getCode, forgotPassword } from '@/services/user';
import { useState } from "react";
import "./index.scss";

const initM = 60;
const ForgotPassword = (props) => {
    const { token } = props;
    const [params, setParams] = useState({});
    const [m, setM] = useState(initM);
    const [isSendingCode, setIsSendingCode] = useState(false);

    const onChange = (type, value) => {
        setParams({
            ...params,
            [type]: value
        })
    }

    const handleGetCode = async () => {
        const { phoneNumber } = params;
        if (!phoneNumber) return Tips.toast('请输入手机号');
        if (!Func.checkRegStr(phoneNumber).isTelephone) return Tips.toast('手机号格式不正确');
        const res = await getCode(params?.phoneNumber)
        if (res?.code == 200) {
            let m = 60;
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
    }

    const onResetPassword = async => {
        const { phoneNumber, code, newPassword, confirmPassword } = params;
        if (!phoneNumber) return Tips.toast('请输入手机号');
        if (!Func.checkRegStr(phoneNumber).isTelephone) return Tips.toast('手机号格式不正确');
        if (!code) return Tips.toast('请输入验证码');
        if (!newPassword) return Tips.toast('请输入新密码');
        if (!confirmPassword) return Tips.toast('请输入确认新密码');
        if (keyRes?.code == 200) {
            
        }
        // Taro.reLaunch({
        //     url: '/pages/login/index'
        // })
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
                        name="phoneNumber"
                        type="number"
                        placeholder='请输入手机号'
                        value={params['phoneNumber']}
                        onChange={(value) => onChange('phoneNumber', value)}
                    />
                </View>
                {isSendingCode ? <AtButton disabled type="primary">{m}s后重试</AtButton> : <AtButton onClick={handleGetCode} type="primary">发送验证码</AtButton>}
            </View>
            <Input
                name="code"
                type="number"
                placeholder='请输入验证码'
                value={params['code']}
                onChange={(value) => onChange('code', value)}
            />
            <Input
                name="newPassword"
                type="password"
                placeholder='请输入新密码'
                value={params['newPassword']}
                onChange={(value) => onChange('newPassword', value)}
            />
            <Input
                name="confirmPassword"
                type="password"
                placeholder='请输入确认新密码'
                value={params['confirmPassword']}
                onChange={(value) => onChange('confirmPassword', value)}
            />
            <View
                style={Func.getStyles({
                    'margin-top': '50px'
                })}
            >
                <AtButton
                    type="primary"
                    onClick={onResetPassword}
                >
                    重置密码
                </AtButton>
            </View>
        </View>
    )
}

export default ForgotPassword;