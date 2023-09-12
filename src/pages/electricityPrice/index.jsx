import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useEffect, useState } from "react";
import { Select } from "@/components";
import { AtButton } from "taro-ui";
import Tips from '@/utils/tips';
import { getFirstArea, getSecondArea, } from '@/services/area';
import { getElectricType, getBillingSystem, getVolLevel, getElectricPrice } from '@/services/electric';
import { Echarts, Table } from "@/components";
import "./index.scss";

const baseTypePriceColumns = [
    {
        title: ["电压等级", "电压等级"],
        type: "multiple",
        key: "multiple"
    },
    {
        title: "尖峰电价",
        key: "cuspPrice"
    },
    {
        title: "高峰电价",
        key: "highPrice"
    },
    {
        title: "平时电价",
        key: "flatPrice"
    },
    {
        title: "低谷电价",
        key: "lowPrice"
    }
]

const ElectricityPrice = (props) => {
    const { token } = props;
    const [typePriceColumns, setTypePriceColumns] = useState([...baseTypePriceColumns])
    const [firstAreaOptions, setFirstAreaOptions] = useState([])
    const [secondAreaOptions, setSecondAreaOptions] = useState([])
    const [electricityTypeOptions, setElectricityTypeOptions] = useState([])
    const [billingSystemOptions, setBillingSystemOptions] = useState([])
    const [volLevelOptions, setVolLevelOptions] = useState([])
    const [typePrice, setTypePrice] = useState({})
    const [usePrice, setUsePrice] = useState([])
    const [volLevelZh, setVolLevelZh] = useState([])


    const [value, setValue] = useState({
        firstArea: undefined,
        secondArea: undefined,
        electricityType: undefined,
        cost: undefined,
        level: undefined
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

    const handleSearch = async () => {
        const { firstArea, secondArea, electricityType, cost, level } = value
        if (!firstArea) return Tips.toast('请选择一级区域')
        if (!secondArea) return Tips.toast('请选择二级区域')
        if (!electricityType) return Tips.toast('请选择用电类型')
        if (!cost) return Tips.toast('请选择计费制度')
        if (!level) return Tips.toast('请选择电压等级')
        Tips.loading('loading...')
        const res = await getElectricPrice({
            districtOneId: firstArea,
            districtTwoId: secondArea,
            electricityTypeId: electricityType,
            costId: cost,
            voltageLevelId: level
        })
        if (res?.code == 200) {
            const { cuspPrice, highPrice, flatPrice, lowPrice, deepValleyPrice, capacityPrice, needPrice, voltageLevel } = res?.data
            const baseTypePriceItem = {
                multiple: voltageLevel,
                cuspPrice,
                highPrice,
                flatPrice,
                lowPrice,
            }
            if (deepValleyPrice) {
                setTypePrice({
                    ...baseTypePriceItem,
                    deepValleyPrice
                })
                setTypePriceColumns([
                    ...baseTypePriceColumns,
                    {
                        title: "深谷电价",
                        key: "deepValleyPrice"
                    }
                ])
            } else {
                setTypePrice({
                    ...baseTypePriceItem
                })
                setTypePriceColumns([
                    ...baseTypePriceColumns
                ])
            }
            setUsePrice([capacityPrice, needPrice])
            setVolLevelZh(voltageLevel)
        } else {
            setTypePrice([])
            setUsePrice([])
        }
        Tips.loaded('loading...')
    }

    return (
        <View
            style={Func.getStyles({
                // background: token.backgroundColor,
                // color: token.color,
                padding: '24px'
            })}
            className="electricityPrice"
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
            <View style={Func.getStyles({
                "margin-top": '30px'
            })}>
                <AtButton type='primary' onClick={handleSearch}>查询区域电价</AtButton>
            </View>
            <View
                className="echartsContent"
            >
                {/* <Echarts
                    style={{
                        width: '100%',
                        height: '300px'
                    }}
                    option={{
                        tooltip: {},
                        grid: {
                            top: 30,
                            bottom: 30
                        },
                        xAxis: {
                            type: 'category',
                            data: ["尖峰电价", "高峰电价", "平时电价", "低谷电价", "深谷电价"]
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                data: typePrice,
                                type: 'bar',
                                barWidth: 30
                            }
                        ]
                    }}
                /> */}
            </View>
            <Table
                columns={typePriceColumns}
                dataSource={[typePrice]}
            />
            <View
                style={Func.getStyles({
                    "text-align": "center",
                    margin: "20px 0",
                    // color: token.colorPrimary,
                    'font-weight': 600,
                    'font-size': '32px'
                })}
            >
                容(需)量用电价格
            </View>
            <Table
                columns={[
                    {
                        title: ["电压等级", "容(需)量用电价格"],
                        type: "multiple",
                        key: "multiple"
                    },
                    {
                        title: "基本电价按需价格",
                        key: "capacityPrice"
                    },
                    {
                        title: "基本电价按容价格",
                        key: "needPrice"
                    }
                ]}
                dataSource={
                    [
                        {
                            multiple: volLevelZh,
                            capacityPrice: usePrice?.[0],
                            needPrice: usePrice?.[1],
                        }
                    ]
                }
            />
        </View>
    )
}

export default ElectricityPrice;