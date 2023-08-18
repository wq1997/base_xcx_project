import { View } from "@tarojs/components"
import { AtButton, AtInput, AtTextarea } from 'taro-ui';
import Taro from "@tarojs/taro";
import Func from "@/utils/Func";
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
        if(!data.telephone){
            Taro.showToast({
                icon: 'none',
                title: '请输入手机号',
                duration: 2000
            })
            return;
        }
        setIsSendingCode(true);
        let timer = setInterval(()=>{
            m--;
            setM(m);
            if(m<=0){
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
            <AtInput
                clear
                type="phone"
                placeholder='请输入手机号'
                value={data['telephone']}
                onChange={(value)=>onChange('telephone', value)}
            >   
                {isSendingCode?<View>{m}s后重试</View>:<View onClick={getCode}>发送验证码</View>}
            </AtInput>
            <AtInput
                clear
                type="number"
                placeholder='请输入验证码'
                value={data['code']}
                onChange={(value)=>onChange('code', value)}
            />  
            <AtInput
                clear
                type="password"
                placeholder='请输入新密码'
                value={data['password']}
                onChange={(value)=>onChange('password', value)}
            />   
            <AtInput
                clear
                type="newPassword"
                placeholder='请输入确认新密码'
                value={data['newPassword']}
                onChange={(value)=>onChange('newPassword', value)}
            /> 
            <View
                style={Func.getStyles({
                    'margin-top': '50px'
                })}
            >
                <AtButton 
                    type="primary"
                    onClick={()=>{
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