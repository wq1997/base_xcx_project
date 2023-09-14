import { View } from "@tarojs/components"
import Func from "@/utils/Func";

const Standard = (props) => {
    const { token } = props;

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px'
            })}
        >
            <View
                style={Func.getStyles({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontWeight: 600,
                    fontSize: '50px'
                })}
            >
                敬请期待！
            </View>
        </View>
    )
}

export default Standard;