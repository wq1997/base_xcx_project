import { View } from "@tarojs/components"
import { Select } from "@/components";
import { AtButton, AtInput } from "taro-ui";
import { useState, useEffect } from "react";
import { getFirstArea, getSecondArea, } from '@/services/area';
import { getElectricType, getBillingSystem, getVolLevel } from '@/services/electric';
import Func from "@/utils/Func";
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
        zd: undefined,
        dj: undefined
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
                value={value["zd"]}
                label="计费制度"
                options={billingSystemOptions}
                placeholder={"请选择计费制度"}
                onChange={(value) => onChange('zd', value)}
            />
            <Select
                value={value["dj"]}
                label="电压等级"
                options={volLevelOptions}
                placeholder={"请选择电压等级"}
                onChange={(value) => onChange('dj', value)}
            />
            <AtInput
                name="zjrl"
                title='装机容量'
                placeholder='请输入装机容量 kWh'
                value={value["zjrl"]}
                onChange={(value) => onChange("zjrl", value)}
            />
            <AtInput
                title='项目周期'
                value="20年"
                disabled
            />
            <AtInput
                title='首付比例'
                value="100%"
                disabled
            />
            <AtInput
                title='业主分成比例'
                value="0%(自营)"
                disabled
            />
            <View style={Func.getStyles({
                "margin-top": '30px'
            })}>
                <AtButton
                    type='primary'
                    onClick={() => {
                        Taro.navigateTo({
                            url: '/pages/investResult/index'
                        })
                    }}
                >
                    开始测算
                </AtButton>
            </View>
        </View>
    )
}

export default Investment;