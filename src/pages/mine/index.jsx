import { View } from '@tarojs/components';
import Func from "@/utils/Func";
import { AtList, AtListItem } from 'taro-ui';
import notification from "@/assets/images/notification.png"
import feedback from "@/assets/images/feedback.png";
import Taro from "@tarojs/taro";
import { getCurrentUser } from '@/utils/authTools';
import { Avatar } from "@/components";
import "./index.scss"

const Mine = (props) => {
    const { token } = props;
    const { nickName } = getCurrentUser()

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px'
            })}
            className='mine'
        >
            <View
                style={Func.getStyles({
                    display: 'flex',
                    "align-items": 'center',
                    "margin-bottom": '60px',
                    "margin-left": '30px'
                })}
                onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/mineCenter/index'
                    })
                }}
            >
                <Avatar />
                <View
                    style={Func.getStyles({
                        "margin-left": "30px"
                    })}
                >{nickName}</View>
            </View>
            <AtList>
                <AtListItem
                    title='消息通知'
                    arrow='right'
                    thumb={notification}
                    onClick={() => {
                        Taro.navigateTo({
                            url: '/pages/notification/index'
                        })
                    }}
                />
                <AtListItem
                    title='意见反馈'
                    arrow='right'
                    thumb={feedback}
                    onClick={() => {
                        Taro.navigateTo({
                            url: '/pages/feedback/index'
                        })
                    }}
                />
            </AtList>
        </View>
    )
}

export default Mine;