import { View } from '@tarojs/components';
import Func from '@/utils/Func';
import { getCurrentUser } from '@/utils/authTools';
import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';
import { Avatar, LinearButton } from '@/components';

const MineCenter = (props) => {
    const { token } = props;
    const { nickName, phoneNumber } = getCurrentUser();

    const ListItemStyle = Func.getStyles({
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        padding: '40px 0',
        'border-bottom': '1px solid #f0f0f0'
    });

    const ListItemLeftStyle = Func.getStyles({
        color: '#545454'
    });

    const ListItemRightStyle = Func.getStyles({
        color: '#ccc'
    });

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px 48px'
            })}
        >
            <View style={ListItemStyle}>
                <View style={ListItemLeftStyle}>头像</View>
                <Avatar />
            </View>
            <View style={ListItemStyle}>
                <View style={ListItemLeftStyle}>姓名</View>
                <View style={ListItemRightStyle}>{nickName}</View>
            </View>
            <View style={ListItemStyle}>
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
                    });
                }}
            >
                <LinearButton title="退出登录" />
            </View>
        </View>
    );
};

export default MineCenter;
