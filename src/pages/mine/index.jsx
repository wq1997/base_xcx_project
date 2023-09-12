import { View } from '@tarojs/components';
import Func from "@/utils/Func";
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import avatar from "@/assets/images/avatar.png";
import notification from "@/assets/images/notification.png"
import feedback from "@/assets/images/feedback.png";
import Taro from "@tarojs/taro";
import { getCurrentUser } from '@/utils/authTools';
import "./index.scss"

const Mine = (props) => {

    const { token } = props;
    const { nickName, phoneNumber } = getCurrentUser()

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
                <View style={Func.getStyles({
                    width: '100px',
                    height: '100px',
                    lineHeight: '100px',
                    borderRadius: '50%',
                    backgroundColor: token.colorPrimary,
                    textAlign: 'center',
                    color: '#fff',
                })}>
                    {nickName.slice(-2)}
                </View>
                <View
                    style={Func.getStyles({
                        "margin-left": "30px"
                    })}
                >{phoneNumber}</View>
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