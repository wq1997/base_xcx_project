import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useState } from "react";
import { AtButton, AtTextarea } from 'taro-ui';
import { Input } from "@/components";
import Taro from "@tarojs/taro";
import { register } from "@/services/user";
import "./index.scss";

const Register = (props) => {
    const { token } = props;
    const [data, setData] = useState({});

    const formItemStyle = Func.getStyles({
        'margin-bottom': '30px'
    });

    const onChange = (type, value) => {
        setData({
            ...data,
            [type]: value
        })
    }

    const onRegister = async () => {
        if (!params.userName) {
            Tips.toast("请输入姓名")
            return;
        }
        if (!params.phoneNumber) {
            Tips.toast("请输入手机号")
            return;
        }
        if (!params.password) {
            Tips.toast("请输入密码")
            return;
        }
        if (!params.confirmPassword) {
            Tips.toast("请确认密码")
            return;
        }
        if (!params.password) {
            Tips.toast("请输入公司")
            return;
        }
        if (!params.password) {
            Tips.toast("请输入手机号")
            return;
        }
        const keyRes = await getPublicKey();
        if (keyRes?.code == 200) {
            console.log(keyRes?.data)
            const loginRes = await login({
                phoneNumber: params?.phoneNumber,
                password: encryptPassword(keyRes?.data, params?.password)
            });
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
                padding: '24px'
            })}
            className="register"
        >
            <View style={formItemStyle}>
                <View>姓名</View>
                <Input
                    name='userName'
                    type='text'
                    placeholder='请输入姓名'
                    value={data["userName"]}
                    onChange={(value) => onChange("userName", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>手机号</View>
                <Input
                    name='phoneNumber'
                    type="number"
                    placeholder='请输入手机号'
                    value={data["phoneNumber"]}
                    onChange={(value) => onChange("phoneNumber", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>密码</View>
                <Input
                    name='password'
                    type='password'
                    placeholder='请输入密码'
                    value={data["password"]}
                    onChange={(value) => onChange("password", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>确定密码</View>
                <Input
                    name='confirmPassword'
                    type='password'
                    placeholder='请输入确定密码'
                    value={data["confirmPassword"]}
                    onChange={(value) => onChange("confirmPassword", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>公司</View>
                <Input
                    name='company'
                    type='text'
                    placeholder='请输入公司'
                    value={data["company"]}
                    onChange={(value) => onChange("company", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>职务</View>
                <Input
                    name='post'
                    type='text'
                    placeholder='请输入职务'
                    value={data["post"]}
                    onChange={(value) => onChange("post", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>合作意向</View>
                <View
                    style={Func.getStyles({
                        margin: '24px 0'
                    })}
                >
                    <AtTextarea
                        value={data["intention"]}
                        onChange={(value) => onChange("intention", value)}
                        maxLength={400}
                        placeholder='合作意向是...'
                    />
                </View>
            </View>
            <AtButton
                type="primary"
                onClick={onRegister}
            >
                注册
            </AtButton>
        </View>
    )
}

export default Register;