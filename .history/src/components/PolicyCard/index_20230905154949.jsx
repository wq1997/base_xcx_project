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
                    overflow: 'hidden',
                    'text-overflow': 'ellipsis',
                    '-webkit-line-clamp': 4,
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical'
                })}
            >
                {listItem?.releaseTime}
            </View>
        </View>
    )
}

export default PolicyCard;