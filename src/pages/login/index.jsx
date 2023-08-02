import { View } from '@tarojs/components';
import { useRouter, getUserProfile } from "@tarojs/taro";
import { useEffect } from "react";
import { AtButton } from 'taro-ui';
import Func from "@/utils/Func";

const Login = (props) => {
    const { token } = props;
    const { params } = useRouter();

    const onLogin = () => {
        getUserProfile({
            desc: '用户登录',
            success(res){
                console.log("用户登录", res);
            }
        })
    }

    const onGetPhoneNumber = (value) => {
        console.log("onGetPhoneNumber", value);
    }

    useEffect(()=>{
        console.log("params", params)
    },[])
    
    return (
        <View
            style={Func.getStyles({
                width: '100vw',
                height: '100vh',
                background: token.backgroundColor,
                color: token.color
            })}
        >
            <View>{params.name}</View>
            <AtButton onClick={onLogin} type="primary">登录1</AtButton>
            <AtButton openType="getPhoneNumber" onGetPhoneNumber={onGetPhoneNumber} type="primary">登录</AtButton>
        </View>
    )
}

export default Login;