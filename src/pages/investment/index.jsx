import { View } from "@tarojs/components"
import { Select } from "@/components";
import { AtButton, AtInput } from "taro-ui";
import { useState, useEffect } from "react";
import { calcInvestmentResult } from '@/services/investment';
import { getFirstArea, getSecondArea, } from '@/services/area';
import { getElectricType, getBillingSystem, getVolLevel } from '@/services/electric';
import Func from "@/utils/Func";
import Tips from '@/utils/tips';
import Taro from "@tarojs/taro";
import "./index.scss";

const Investment = (props) => {
    const { token } = props;
    const [firstAreaOptions, setFirstAreaOptions] = useState([])
    const [secondAreaOptions, setSecondAreaOptions] = useState([])
    const [electricityTypeOptions, setElectricityTypeOptions] = useState([])
    const [billingSystemOptions, setBillingSystemOptions] = useState([])
    const [volLevelOptions, setVolLevelOptions] = useState([])

    const [value, setValue] = useState({
        firstArea: undefined,
        secondArea: undefined,
        electricityType: undefined,
        cost: undefined,
        level: undefined,
        capacity: undefined,
        cycle: undefined,
        downPaymentRatio: 0,
        shareRatio: 100,

    });

    const onChange = (type, currentValue) => {
        setValue({
            ...value,
            [type]: currentValue
        })
    }


    const initOptions = async (api, setFn, params) => {
        let res = await api(params)
        if (res?.code == 200) {
            setFn(res?.data?.map(item => ({
                label: item.name,
                value: item?.id
            })))

        }
    }

    useEffect(() => {
        [
            { api: getFirstArea, setFn: setFirstAreaOptions },
            { api: getElectricType, setFn: setElectricityTypeOptions },
            { api: getBillingSystem, setFn: setBillingSystemOptions },
            { api: getVolLevel, setFn: setVolLevelOptions },
        ].forEach(({ api, setFn }) => initOptions(api, setFn))
    }, [])

    useEffect(() => {
        onChange('secondArea', undefined)
        value.firstArea && initOptions(getSecondArea, setSecondAreaOptions, value.firstArea)
    }, [value.firstArea])

    const handleInvestment = async () => {
        const { firstArea, secondArea, electricityType, cost, level, capacity, cycle } = value;
        if (!firstArea) return Tips.toast('请选择一级区域');
        if (!secondArea) return Tips.toast('请选择二级区域');
        if (!electricityType) return Tips.toast('请选择用电类型');
        if (!cost) return Tips.toast('请选择计费制度');
        if (!level) return Tips.toast('请选择电压等级');
        if (!capacity) return Tips.toast('请输入装机容量');
        if (!cycle) return Tips.toast('请输入项目周期');
        let res = await calcInvestmentResult(value)
        if (res?.code == 200 && res?.data) {
            Taro.navigateTo({
                url: `/pages/investResult/index?result=${encodeURIComponent(JSON.stringify(res?.data))}`
            })
        }
    }


    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px'
            })}
            className="investment"
        >
            <Select
                value={value["firstArea"]}
                label="一级区域"
                options={firstAreaOptions}
                placeholder={"请选择一级区域"}
                onChange={(value) => onChange('firstArea', value)}
            />
            <Select
                value={value["secondArea"]}
                label="二级区域"
                options={secondAreaOptions}
                placeholder={"请选择二级区域"}
                onChange={(value) => onChange('secondArea', value)}
            />
            <Select
                value={value["electricityType"]}
                label="用电类型"
                options={electricityTypeOptions}
                placeholder={"请选择用电类型"}
                onChange={(value) => onChange('electricityType', value)}
            />
            <Select
                value={value["cost"]}
                label="计费制度"
                options={billingSystemOptions}
                placeholder={"请选择计费制度"}
                onChange={(value) => onChange('cost', value)}
            />
            <Select
                value={value["level"]}
                label="电压等级"
                options={volLevelOptions}
                placeholder={"请选择电压等级"}
                onChange={(value) => onChange('level', value)}
            />
            <AtInput
                name="capacity"
                title='装机容量（kWh）'
                type='number'
                placeholder='请输入装机容量'
                value={value["capacity"]}
                onChange={(value) => onChange("capacity", +value)}
            />
            <AtInput
                name="cycle"
                title='项目周期（年）'
                type='number'
                placeholder='请输入项目周期'
                value={value["cycle"]}
                onChange={(value) => onChange("cycle", +value)}
            />
            <AtInput
                name='downPaymentRatio'
                title='首付比例（%）'
                type='number'
                placeholder='请输入首付比例'
                disabled={true}
                value={value["downPaymentRatio"]}
            />
            <AtInput
                name='shareRatio'
                title='业主分成比例（%）'
                type='number'
                placeholder='请输入业主分成比例'
                disabled={true}
                value={value["shareRatio"]}
            />
            <View style={Func.getStyles({
                "margin-top": '30px'
            })}>
                <AtButton
                    type='primary'
                    onClick={() => {

                        handleInvestment()
                    }}
                >
                    开始测算
                </AtButton>
            </View>
        </View>
    )
}

export default Investment;