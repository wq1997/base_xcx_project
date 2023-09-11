import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { getCurrentUser } from '@/utils/authTools';
import avatar from "@/assets/images/avatar.png";
import { AtAvatar, AtButton } from 'taro-ui';
import Taro from "@tarojs/taro";

const MineCenter = (props) => {

    const { token } = props;
    const { username, phoneNumber } = getCurrentUser()

    
    const ListItemStyle = Func.getStyles({
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        margin: '70px 0'
    });

    const ListItemLeftStyle = Func.getStyles({
        color: '#545454',
    });

    const ListItemRightStyle = Func.getStyles({
        color: '#ccc',
    });

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px 48px'
            })}
        >
            <View
                style={ListItemStyle}
            >
                <View style={ListItemLeftStyle}>头像</View>
                <AtAvatar
                    image={avatar}
                    circle
                />
            </View>
            <View
                style={ListItemStyle}
            >
                <View style={ListItemLeftStyle}>姓名</View>
                <View style={ListItemRightStyle}>{username}</View>
            </View>
            <View
                style={ListItemStyle}
            >
                <View style={ListItemLeftStyle}>手机号</View>
                <View style={ListItemRightStyle}>{phoneNumber}</View>
            </View>

            <View
                style={Func.getStyles({
                    position: 'absolute',
                    bottom: '120px',
                    width: 'calc(100% - 48px - 48px)'
                })}
                onClick={() => {
                    Taro.reLaunch({
                        url: '/pages/login/index'
                    })
                }}
            >
                <AtButton type="primary">退出登录</AtButton>
            </View>
        </View>
    )
}

export default MineCenter;