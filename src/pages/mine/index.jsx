import { View } from '@tarojs/components';
import Func from "@/utils/Func";
import { AtList, AtListItem } from 'taro-ui';
import { PUBLIC_FILE_PATH } from "@/utils/constants";
import Taro from "@tarojs/taro";
import { getCurrentUser } from '@/utils/authTools';
import { Avatar } from "@/components";
import "./index.scss"

const Mine = (props) => {

    const { token } = props;
    const { nickName, phoneNumber } = getCurrentUser()

    return (
        <View
            style={Func.getStyles({
                background: 'token.backgroundColor',
                color: token.color,
                padding: '24px'
            })}
            className='mine'
        >
            <View
                style={Func.getStyles({
                    width: '100%',
                    height: '300px',
                    position: 'absolute',
                    background: token.colorPrimary,
                    top: 0,
                    left: 0
                })}
            >
                <View
                    style={Func.getStyles({
                        width: '100%',
                        height: '300px',
                        position: 'absolute',
                        background: token.colorPrimary,
                        bottom: '-140px',
                        left: 0,
                        'border-radius': '50%'
                    })}
                ></View>
            </View>
            <View
                style={Func.getStyles({
                    display: 'flex',
                    "align-items": 'center',
                    height: '200px',
                    position: 'absolute',
                    top: 0
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
                        "margin-left": "30px",
                        color: '#fff'
                    })}
                >{phoneNumber}</View>
            </View>
            <View
                style={Func.getStyles({
                    position: 'absolute',
                    top: '200px',
                    width: 'calc(100% - 48px)',
                    'border-radius': '16px'
                })}
            >
                <AtList>
                    <AtListItem
                        title='消息通知'
                        arrow='right'
                        thumb={`${PUBLIC_FILE_PATH}notification.png`}
                        onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/notification/index'
                            })
                        }}
                    />
                    <AtListItem
                        title='意见反馈'
                        arrow='right'
                        thumb={`${PUBLIC_FILE_PATH}feedback.png`}
                        onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/feedback/index'
                            })
                        }}
                    />
                </AtList>
            </View>
        </View>
    )
}

export default Mine;