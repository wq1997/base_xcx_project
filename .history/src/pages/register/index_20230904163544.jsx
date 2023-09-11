import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useState } from "react";
import { AtButton, AtTextarea } from 'taro-ui';
import { Input } from "@/components";
import Tips from "@/utils/tips";
import Taro from "@tarojs/taro";
import { encryptPassword } from '@/utils/authTools'
import { register, getPublicKey } from "@/services/user";
import "./index.scss";

const Register = (props) => {
    const { token } = props;
    const [params, setParams] = useState({});

    const formItemStyle = Func.getStyles({
        'margin-bottom': '30px'
    });

    const onChange = (type, value) => {
        setParams({
            ...params,
            [type]: value
        })
    }

    const onRegister = async () => {
        const { nickName, phoneNumber, password, confirmPassword, company, post, intention } = params
        if (!nickName?.trim()) return Tips.toast("请输入姓名")
        if (!phoneNumber) return Tips.toast("请输入手机号")
        if (!Func.checkRegStr(phoneNumber).isTelephone) return Tips.toast("手机号格式不正确")
        if (!password?.trim()) return Tips.toast("请输入密码")
        if (!confirmPassword?.trim()) return Tips.toast("请输入确定密码")
        if (!company?.trim()) return Tips.toast("请输入公司")
        if (!post?.trim()) return Tips.toast("请输入职务")
        if (!intention?.trim()) return Tips.toast("请输入合作意向")
        Tips.loading(true)
        const keyRes = await getPublicKey();
        if()
        const res = await register({
            ...params,
            password: encryptPassword(keyRes?.data, password),
            confirmPassword: encryptPassword(keyRes?.data, confirmPassword)
        });
        Tips.loading(false)
        if (res?.code == 200) {
            Tips.toast("注册成功")
            Taro.reLaunch({
                url: '/pages/login/index'
            })
        }
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
                    name='nickName'
                    type='text'
                    placeholder='请输入姓名'
                    value={params["nickName"]}
                    onChange={(value) => onChange("nickName", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>手机号</View>
                <Input
                    name='phoneNumber'
                    type="phone"
                    placeholder='请输入手机号'
                    value={params["phoneNumber"]}
                    onChange={(value) => onChange("phoneNumber", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>密码</View>
                <Input
                    name='password'
                    type='password'
                    placeholder='请输入密码'
                    value={params["password"]}
                    onChange={(value) => onChange("password", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>确定密码</View>
                <Input
                    name='confirmPassword'
                    type='password'
                    placeholder='请输入确定密码'
                    value={params["confirmPassword"]}
                    onChange={(value) => onChange("confirmPassword", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>公司</View>
                <Input
                    name='company'
                    type='text'
                    placeholder='请输入公司'
                    value={params["company"]}
                    onChange={(value) => onChange("company", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>职务</View>
                <Input
                    name='post'
                    type='text'
                    placeholder='请输入职务'
                    value={params["post"]}
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
                        value={params["intention"]}
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