import { View } from "@tarojs/components"
import Func from "@/utils/Func";

const PolicyCard = (props) => {
    const { token, listItem } = props;
    return (
        <View
            style={Func.getStyles({
                padding: '24px',
                border: `1px solid ${token.colorBorder}`,
                "border-radius": '8px'
            })}
        >
            <View
                style={Func.getStyles({
                    "font-size": '30px',
                    "font-weight": 600,
                    "margin-bottom": '30px'
                })}
            >
                {listItem?.policyName}
            </View>
            <View
                style={Func.getStyles({
                    display: 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center',
                    "margin-bottom": '30px'
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
                     {listItem?.policyName}
                </View>
                <View
                    style={Func.getStyles({
                        "font-size": '20px'
                    })}
                >
                    2023年07月05日
                </View>
            </View>
            <View
                style={Func.getStyles({
                    overflow: 'hidden',
                    'text-overflow': 'ellipsis',
                    '-webkit-line-clamp': 4,
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical'
                })}
            >
                到2025年，新型储能电站装机规模达到300万千瓦，全省新型储能产业营业收入达到4000亿元以上。完善延伸锂电产业链优势。加速培育液流电池储能产业。做强压缩空气储能产业。培育壮大氢储运装备产业。协调推进电源侧储能发展。推动新型储能多场景优化布局.
            </View>
        </View>
    )
}

export default PolicyCard;