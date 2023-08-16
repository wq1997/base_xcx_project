import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import "./index.scss";

const InvestResult = (props) => {
    const { token } = props;
    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px'
            })}
            className="investmentResult"
        >
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    "margin-bottom": '20px',
                    "text-align": 'center',
                    "font-size": '32px',
                    "font-weight": 600
                })}
            >
                测算结果
            </View>
            <View className="resultList">
                <View className="resultListItem">全生命周期收益</View>
                <View className="resultListItem">1</View>
                <View className="resultListItem">全生命周期收益</View>
                <View className="resultListItem">1</View>
                <View className="resultListItem">全生命周期收益</View>
                <View className="resultListItem">1</View>
            </View>
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    "margin-bottom": '20px',
                    "text-align": 'center',
                    "font-size": '32px',
                    "font-weight": 600
                })}
            >
                收益估算
            </View>
            <View className="estimateData">
                    <View className="estimateDataItem">测算周期 20年</View>
                    <View className="estimateDataItem">年运营天数 330天</View>
            </View>
            <View className="estimateResult">
                <View className="estimateResultItem">年数</View>
                <View className="estimateResultItem">总收益</View>
            </View>
        </View>
    )
}

export default InvestResult;