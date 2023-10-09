import { View } from '@tarojs/components';
import { Select, LinearButton, Header } from '@/components';
import { AtButton, AtInput } from 'taro-ui';
import { useState, useEffect } from 'react';
import { calcInvestmentResult } from '@/services/investment';
import { getFirstArea, getSecondArea } from '@/services/area';
import { getElectricType, getBillingSystem, getVolLevel } from '@/services/electric';
import Func from '@/utils/Func';
import Tips from '@/utils/tips';
import Taro from '@tarojs/taro';
import './index.scss';

const Investment = (props) => {
    const { token } = props;
    const [firstAreaOptions, setFirstAreaOptions] = useState([]);
    const [secondAreaOptions, setSecondAreaOptions] = useState([]);
    const [electricityTypeOptions, setElectricityTypeOptions] = useState([]);
    const [billingSystemOptions, setBillingSystemOptions] = useState([]);
    const [volLevelOptions, setVolLevelOptions] = useState([]);
    const { top, height } = Taro.getMenuButtonBoundingClientRect();

    const [value, setValue] = useState({
        firstArea: undefined,
        secondArea: undefined,
        electricityType: undefined,
        cost: undefined,
        level: undefined,
        capacity: undefined,
        cycle: undefined,
        downPaymentRatio: 0,
        shareRatio: 100
    });

    const initOptions = async (api, setFn, params) => {
        let res = await api(params);
        if (res?.code == 200) {
            setFn(
                res?.data?.map((item) => ({
                    label: item.name,
                    value: item?.id
                }))
            );
        }
    };
    const onChange = (type, currentValue) => {
        const { firstArea, secondArea, electricityType } = value;
        if (type == 'firstArea') {
            setValue({
                ...value,
                firstArea: currentValue,
                secondArea: undefined,
                electricityType: undefined,
                cost: undefined,
                level: undefined
            });
            setElectricityTypeOptions([]);
            setBillingSystemOptions([]);
            setVolLevelOptions([]);
            initOptions(getSecondArea, setSecondAreaOptions, currentValue);
        }
        if (type == 'secondArea') {
            setValue({
                ...value,
                secondArea: currentValue,
                electricityType: undefined,
                cost: undefined,
                level: undefined
            });
            setBillingSystemOptions([]);
            setVolLevelOptions([]);
            initOptions(getElectricType, setElectricityTypeOptions, {
                districtOneId: firstArea,
                districtTwoId: currentValue
            });
        }
        if (type == 'electricityType') {
            setValue({
                ...value,
                electricityType: currentValue,
                cost: undefined,
                level: undefined
            });
            setVolLevelOptions([]);
            initOptions(getBillingSystem, setBillingSystemOptions, {
                districtOneId: firstArea,
                districtTwoId: secondArea,
                electricityTypeId: currentValue
            });
        }
        if (type == 'cost') {
            setValue({
                ...value,
                cost: currentValue,
                level: undefined
            });
            initOptions(getVolLevel, setVolLevelOptions, {
                districtOneId: firstArea,
                districtTwoId: secondArea,
                electricityTypeId: electricityType,
                costId: currentValue
            });
        }
        if (type == 'level' || type == 'capacity' || type == 'cycle') {
            setValue({
                ...value,
                [type]: currentValue
            });
        }
    };

    useEffect(() => {
        initOptions(getFirstArea, setFirstAreaOptions);
    }, []);

    const handleInvestment = async () => {
        const { firstArea, secondArea, electricityType, cost, level, capacity, cycle, downPaymentRatio, shareRatio } = value;
        if (!firstArea) return Tips.toast('请选择一级区域');
        if (!secondArea) return Tips.toast('请选择二级区域');
        if (!electricityType) return Tips.toast('请选择用电类型');
        if (!cost) return Tips.toast('请选择计费制度');
        if (!level) return Tips.toast('请选择电压等级');
        if (!capacity) return Tips.toast('请输入装机容量');
        if (!Func.checkRegStr(+capacity).isPositiveNumber) return Tips.toast('装机容量必须是正数');
        if (!cycle) return Tips.toast('请输入项目周期');
        if (!Func.checkRegStr(+cycle).isPositiveInteger) return Tips.toast('项目周期必须是正整数');
        let res = await calcInvestmentResult({
            districtOneId: firstArea,
            districtTwoId: secondArea,
            electricityTypeId: electricityType,
            costId: cost,
            voltageLevelId: level,
            capacity: +capacity,
            cycle: +cycle,
            downPaymentRatio, shareRatio
        });
        if (res?.code == 200 && res?.data) {
            Taro.navigateTo({
                url: `/pages/investResult/index?result=${encodeURIComponent(
                    JSON.stringify(res?.data)
                )}`
            });
        }
    };

    return (
        <View
            style={Func.getStyles({
                color: token.color,
                backgroundColor: '#eee',
                'padding-bottom': '30px',
                height: '100vh',
                'box-sizing': 'border-box'
            })}
            className="investment"
        >
            <Header title="投资测算"></Header>
            <View
                style={Func.getStyles({
                    background: token.colorPrimary,
                    height: '200px',
                    'padding-top': 2 * (top + height) - 50 + 'px'
                })}
            ></View>
            <View
                style={Func.getStyles({
                    'margin-bottom': '60px',
                    'font-size': '30px',
                    'line-height': '60px',
                    padding: '30px',
                    'border-radius': '10px',
                    backgroundColor: '#fff',
                    position: 'relative',
                    top: '-50px',
                    margin: '0 30px'
                })}
            >
                <Select
                    value={value['firstArea']}
                    label="一级区域"
                    options={firstAreaOptions}
                    placeholder={'请选择一级区域'}
                    onChange={(value) => onChange('firstArea', value)}
                />
                <Select
                    value={value['secondArea']}
                    label="二级区域"
                    options={secondAreaOptions}
                    placeholder={'请选择二级区域'}
                    onChange={(value) => onChange('secondArea', value)}
                />
                <Select
                    value={value['electricityType']}
                    label="用电类型"
                    options={electricityTypeOptions}
                    placeholder={'请选择用电类型'}
                    onChange={(value) => onChange('electricityType', value)}
                />
                <Select
                    value={value['cost']}
                    label="计费制度"
                    options={billingSystemOptions}
                    placeholder={'请选择计费制度'}
                    onChange={(value) => onChange('cost', value)}
                />
                <Select
                    value={value['level']}
                    label="电压等级"
                    options={volLevelOptions}
                    placeholder={'请选择电压等级'}
                    onChange={(value) => onChange('level', value)}
                />
                <AtInput
                    name="capacity"
                    title="装机容量（kWh）"
                    type="number"
                    placeholder="请输入装机容量"
                    value={value['capacity']}
                    onChange={(value) => onChange('capacity', value)}
                />
                <AtInput
                    name="cycle"
                    title="项目周期（年）"
                    type="number"
                    placeholder="请输入项目周期"
                    value={value['cycle']}
                    onChange={(value) => onChange('cycle', value)}
                />
                <AtInput
                    name="downPaymentRatio"
                    title="首付比例（%）"
                    type="number"
                    placeholder="请输入首付比例"
                    disabled={true}
                    value={value['downPaymentRatio']}
                />
                <AtInput
                    name="shareRatio"
                    title="业主分成比例（%）"
                    type="number"
                    border={false}
                    placeholder="请输入业主分成比例"
                    disabled={true}
                    value={value['shareRatio']}
                />
            </View>
            <LinearButton
                style={{
                    'margin-top': '30px',
                    margin: '0 30px'
                }}
                onClick={() => {
                    handleInvestment();
                }}
                title="开始测算"
            />
        </View>
    );
};

export default Investment;
