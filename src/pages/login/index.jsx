import { View } from '@tarojs/components';
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";

const Login = () => {
    const { params } = useRouter();

    useEffect(()=>{
        console.log("params", params)
    },[])
    
    return (
        <View>{params.name}</View>
    )
}

export default Login;