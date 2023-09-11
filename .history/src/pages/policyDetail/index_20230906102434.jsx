import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import Taro from "@tarojs/taro";

const PolicyDetail = (props) => {
    const { token } = props;
    const { router } = Taro.getCurrentInstance()
    const listItem = JSON.parse(decodeURIComponent(router?.params?.listItem))

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
                    color: token.colorPrimary,
                    "margin-bottom": '60px',
                    "text-align": 'center',
                    "font-size": '32px',
                    "font-weight": 700
                })}
            >
                {listItem?.policyName}
            </View>
            <View
                style={Func.getStyles({
                    display: 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center',
                    "margin-bottom": '60px'
                })}
            >
                <View
                    style={Func.getStyles({
                        padding: '10px',
                        "background-color": token.colorPrimary,
                        color: 'white',
                        "border-radius": '4px',
                        "font-size": '20px'
                    })}
                >
                    {listItem?.issueUnit}
                </View>
                <View
                    style={Func.getStyles({
                        "font-size": '20px'
                    })}
                >
                    {listItem?.releaseTime}
                </View>
            </View>
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    "margin-bottom": '30px',
                    "text-align": 'center',
                    "font-size": '32px',
                    "font-weight": 600
                })}
            >
                政策摘要
            </View>
            <View
                style={Func.getStyles({
                    "margin-bottom": '60px',
                })}
            >
                {listItem?.policyPoints}
            </View>
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    "margin-bottom": '30px',
                    "text-align": 'center',
                    "font-size": '32px',
                    "font-weight": 600
                })}
            >
                政策解读
            </View>
            <View
                style={Func.getStyles({
                    "margin-bottom": '60px',
                })}
            >
                {listItem?.policyPoints}
            </View>
            <View
                onClick={() => {
                    Taro.navigateTo({
                        url: `/pages/outer/index?url=http://k.sina.com.cn/article_3942942182_eb0485e6001012rdp.html&title=政策原文`
                    })
                }}
                style={Func.getStyles({
                    "margin-bottom": '30px',
                    "font-size": '32px',
                })}
            >
                政策原文
            </View>
        </View>
    )
}

export default PolicyDetail;