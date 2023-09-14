import { View } from "@tarojs/components"
import Taro from "@tarojs/taro";
import Func from "@/utils/Func";
import { AtIcon } from 'taro-ui'


const Header = (props) => {
    const { title } = props;
    const { top, height } = Taro.getMenuButtonBoundingClientRect()

    return (
        <View style={Func.getStyles({
            position: 'fixed',
            width: '100%',
            top: 2 * top + 'px',
            height: 2 * height + 'px',
            display: 'flex',
            'justify-content': 'space-between',
            'align-items': 'center',
            padding: ' 0 20px',

        })}>
            <AtIcon
                value='chevron-left'
                size='25' color='#fff'
                onClick={() => Taro.navigateBack({ delta: 1 })}
            />
            <View style={Func.getStyles({
                position: 'relative',
                transform: 'translateX(-50%)',
                color: '#fff'
            })}>
                {title}
            </View>
            <View></View>
        </View>
    )
}

export default Header;

