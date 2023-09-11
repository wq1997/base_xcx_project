import { View, WebView } from "@tarojs/components"
import Taro from "@tarojs/taro";
import { useEffect } from "react";

const Outer = () => {
    const params = Taro.getCurrentInstance().router.params;
    const { url } = params;

    return (
        <View>
            <WebView src={`${url}`} />
        </View>
    )
}

export default Outer;