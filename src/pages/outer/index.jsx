import { View, WebView } from "@tarojs/components"
import Taro from "@tarojs/taro";
import { useEffect } from "react";

const Outer = () => {
    const params = Taro.getCurrentInstance().router.params;
    const { url, title } = params;

    useEffect(() => {
        Taro.setNavigationBarTitle({
            title
        })
    }, [title]);

    return (
        <View>
            <WebView src={`https://energy.sermatec-cloud.com/mobile/webview`} />
        </View>
    )
}

export default Outer;