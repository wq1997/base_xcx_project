import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import Taro from "@tarojs/taro";
import "./index.scss";

const InvestResult = (props) => {
    const { token } = props;
    const { router } = Taro.getCurrentInstance()
    const {
        annualIncome,
        annualOperatingDays,
        cycle,
        floorArea,
        irr,
        recyclingCycle,
        totalCost,
        totalRevenue,
        unitCost
    } = JSON.parse(decodeURIComponent(router?.params?.result))

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
                <View className="resultListItem">{totalRevenue} 万元</View>
                <View className="resultListItem">初始投资回收期</View>
                <View className="resultListItem">{recyclingCycle} 年</View>
                <View className="resultListItem">收益率（IRR）</View>
                <View className="resultListItem">{irr} %</View>
                <View className="resultListItem">动态单位造价</View>
                <View className="resultListItem">{unitCost}</View>
                <View className="resultListItem">动态总造价</View>
                <View className="resultListItem">{totalCost}</View>
                <View className="resultListItem">占地面积</View>
                <View className="resultListItem">{floorArea}</View>
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
                <View className="estimateDataItem">测算周期 {cycle}年</View>
                <View className="estimateDataItem">年运营天数 {annualOperatingDays}天</View>
            </View>
            <View className="estimateResult">
                <View className="estimateResultItem">年数</View>
                <View className="estimateResultItem">总收益</View>
            </View>
            {
                annualIncome?.map((item, index) => {
                    return <View className="estimateResult">
                        <View className="estimateResultItem">{
                            index == 0 ? '初期投资' : index
                        }</View>
                        <View className="estimateResultItem">{item}</View>
                    </View>
                })
            }
        </View>
    )
}

export default InvestResult;