import { View } from "@tarojs/components"
import Func from "@/utils/Func";

const ElectricityPrice = (props) => {
    const { token } = props;
    return (
        <View
            style={Func.getStyles({
                height: 'calc(100vh - 48px)',
                background: token.backgroundColor,
                color: token.color,
                padding: '24px'
            })}
        >

        </View>
    )
}

export default ElectricityPrice;