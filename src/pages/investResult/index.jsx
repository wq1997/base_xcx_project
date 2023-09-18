import { View } from '@tarojs/components';
import Func from '@/utils/Func';
import Taro from '@tarojs/taro';
import './index.scss';

const InvestResult = (props) => {
    const { token } = props;
    const {
        router: {
            params: { result }
        }
    } = Taro.getCurrentInstance();
    let _result;
    if (result) {
        _result = JSON.parse(decodeURIComponent(result));
    }
    console.log(_result)

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px',
                background: '#eee',
                height: '100vh',
                'box-sizing': 'border-box'
            })}
            className="investmentResult"
        >
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    'margin-bottom': '20px',
                    'text-align': 'center',
                    'font-size': '32px',
                    'font-weight': 600
                })}
            >
                测算结果
            </View>
            <View
                className="resultList"
                style={Func.getStyles({
                    background: '#fff',
                    padding: '20px 0',
                    'border-radius': '20px'
                })}
            >
                <View className="resultListItem">全生命周期收益</View>
                <View className="resultListItem value">{_result?.totalRevenue} 万元</View>
                <View className="resultListItem">初始投资回收期</View>
                <View className="resultListItem value">{_result?.recyclingCycle} 年</View>
                <View className="resultListItem">收益率（IRR）</View>
                <View className="resultListItem value">{_result?.irr} %</View>
                <View className="resultListItem">动态单位造价</View>
                <View className="resultListItem value">{_result?.unitCost}</View>
                <View className="resultListItem">动态总造价</View>
                <View className="resultListItem value">{_result?.totalCost}</View>
                <View className="resultListItem">占地面积</View>
                <View className="resultListItem value">{_result?.floorArea}</View>
            </View>
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    'margin-bottom': '20px',
                    'text-align': 'center',
                    'font-size': '32px',
                    'font-weight': 600
                })}
            >
                收益估算
            </View>
            <View className="estimateData">
                <View className="estimateDataItem">测算周期 {_result?.cycle} 年</View>
                <View className="estimateDataItem">
                    年运营天数 {_result?.annualOperatingDays} 天
                </View>
            </View>
            <View className="estimateResult header">
                <View className="estimateResultItem">年数</View>
                <View className="estimateResultItem revenue">总收益</View>
            </View>
            {_result?.annualIncome?.map((item, index) => {
                return (
                    <View className="estimateResult value"
                        style={Func.getStyles({
                            backgroundColor: index % 2 == 0 ? '#fff' : '#F8F8F8'
                        })}>
                        <View className="estimateResultItem">
                            {index == 0 ? '初期投资' : index}
                        </View>
                        <View className="estimateResultItem">{item}</View>
                    </View>
                );
            })}
        </View>
    );
};

export default InvestResult;
