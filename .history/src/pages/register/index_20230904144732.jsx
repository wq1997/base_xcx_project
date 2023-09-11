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

    const onRe = async () => {
        if (!params.phoneNumber) {
            Tips.toast("请输入手机号")
            return;
        }
        if (!params.password) {
            Tips.toast("请输入密码")
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

        // if (res) {
        //     Taro.switchTab({
        //         url: '/pages/home/index'
        //     })
        // }
        // Taro.switchTab({
        //     url: '/pages/home/index'
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
                    name='name'
                    type='text'
                    placeholder='请输入姓名'
                    value={data["name"]}
                    onChange={(value) => onChange("name", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>手机号</View>
                <Input
                    name='telephone'
                    type="number"
                    placeholder='请输入手机号'
                    value={data["telephone"]}
                    onChange={(value) => onChange("telephone", value)}
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
                    name='surePassword'
                    type='password'
                    placeholder='请输入确定密码'
                    value={data["surePassword"]}
                    onChange={(value) => onChange("surePassword", value)}
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
                    name='site'
                    type='text'
                    placeholder='请输入职务'
                    value={data["site"]}
                    onChange={(value) => onChange("site", value)}
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
                        value={data["hzyx"]}
                        onChange={(value) => onChange("hzyx", value)}
                        maxLength={400}
                        placeholder='合作意向是...'
                    />
                </View>
            </View>
            <AtButton
                type="primary"
                onClick={() => {
                    Taro.reLaunch({
                        url: '/pages/login/index'
                    })
                }}
            >
                注册
            </AtButton>
        </View>
    )
}

export default Register;