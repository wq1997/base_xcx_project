import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useState } from "react";
import { AtButton, AtInput, AtTextarea } from 'taro-ui';
import Taro from "@tarojs/taro";
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
                <AtInput
                    name='name'
                    type='text'
                    placeholder='请输入姓名'
                    value={data["name"]}
                    onChange={(value)=>onChange("name", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>手机号</View>
                <AtInput
                    name='telephone'
                    type="phone"
                    placeholder='请输入手机号'
                    value={data["telephone"]}
                    onChange={(value)=>onChange("telephone", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>密码</View>
                <AtInput
                    name='password'
                    type='password'
                    placeholder='请输入密码'
                    value={data["password"]}
                    onChange={(value)=>onChange("password", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>确定密码</View>
                <AtInput
                    name='surePassword'
                    type='surePassword'
                    placeholder='请输入确定密码'
                    value={data["surePassword"]}
                    onChange={(value)=>onChange("surePassword", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>公司</View>
                <AtInput
                    name='company'
                    type='text'
                    placeholder='请输入公司'
                    value={data["company"]}
                    onChange={(value)=>onChange("company", value)}
                />
            </View>
            <View style={formItemStyle}>
                <View>职务</View>
                <AtInput
                    name='site'
                    type='text'
                    placeholder='请输入职务'
                    value={data["site"]}
                    onChange={(value)=>onChange("site", value)}
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
                        onChange={(value)=>onChange("hzyx", value)}
                        maxLength={400}
                        placeholder='合作意向是...'
                    />
                </View>
            </View>
            <AtButton 
                type="primary"
                onClick={()=>{
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