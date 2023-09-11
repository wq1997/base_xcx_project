import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useEffect, useState } from "react";
import { Select } from "@/components";
import { AtButton } from "taro-ui";
import { getFirstArea, getSecondArea, } from '@/services/area';
import { getElectricType, getBillingSystem, getVolLevel } from '@/services/electric';
import { Echarts, Table } from "@/components";
import "./index.scss";

const ElectricityPrice = (props) => {
    const { token } = props;
    const [firstAreaOptions, setFirstAreaOptions] = useState([])
    const [secondAreaOptions, setSecondAreaOptions] = useState([])
    const [electricityTypeOptions, setElectricityTypeOptions] = useState([])
    const [billingSystemOptions, setBillingSystemOptions] = useState([])
    const [volLevelOptions, setVolLevelOptions] = useState([])

    const [value, setValue] = useState({
        firstArea: undefined,
        secondArea: undefined,
        electricityType: undefined
    });

    const onChange = (type, currentValue) => {
        setValue({
            ...value,
            [type]: currentValue
        })
    }

    const initFirstArea = async () => {
        let res = await getFirstArea()
        if (res?.code == 200) {
            setFirstAreaOptions(res?.data?.map(item => ({
                label: item.name,
                value: item?.id
            })))
        }
    }

    const initSecondArea = async (pId) => {
        let res = await getSecondArea(pId)
        if (res?.code == 200) {
            setSecondAreaOptions(res?.data?.map(item => ({
                label: item.name,
                value: item?.id
            })))
        }
    }

    const initElectricType = async () => {
        let res = await getElectricType()
        if (res?.code == 200) {
            setElectricityTypeOptions(res?.data?.map(item => ({
                label: item.name,
                value: item?.id
            })))
        }
    }

    const initBillingSystem = async () => {
        let res = await getBillingSystem()
        if (res?.code == 200) {
            setBillingSystemOptions(res?.data?.map(item => ({
                label: item.name,
                value: item?.id
            })))

        }
    }

    const initVolLevel = async () => {
        let res = await getVolLevel()
        if (res?.code == 200) {
            setVolLevelOptions(res?.data?.map(item => ({
                label: item.name,
                value: item?.id
            })))

        }
    }


    const initOptions = (api,setFn) =>{

    }

    useEffect(() => {
        [
            {api:getFirstArea,}
        ]
        initFirstArea()
        initElectricType()
        initBillingSystem()
        initVolLevel()
    }, [])

    useEffect(() => {
        onChange('secondArea', undefined)
        value.firstArea && initSecondArea(value.firstArea)
    }, [value.firstArea])


    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
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
            <View style={Func.getStyles({
                "margin-top": '30px'
            })}>
                <AtButton type='primary'>查询区域电价</AtButton>
            </View>
            <View
                className="echartsContent"
            >
                <Echarts
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
                            data: ["尖峰电价", "高峰电价", "平时电价", "低谷电价"]
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                data: [143, 115, 68, 27],
                                type: 'bar',
                                barWidth: 30
                            }
                        ]
                    }}
                />
            </View>
            <Table
                columns={[
                    {
                        title: ["时段电价", "电压等级"],
                        type: "multiple",
                        key: "multiple"
                    },
                    {
                        title: "尖峰电价",
                        key: "spring"
                    },
                    {
                        title: "高峰电价",
                        key: "summer"
                    },
                    {
                        title: "平时电价",
                        key: "autumn"
                    },
                    {
                        title: "低谷电价",
                        key: "winter"
                    }
                ]
                }
                dataSource={
                    [
                        {
                            multiple: '220千伏及以上',
                            spring: '143',
                            summer: '115',
                            autumn: '68',
                            winter: '27'
                        }
                    ]
                }
            />
            <View
                style={Func.getStyles({
                    "text-align": "center",
                    margin: "20px 0",
                    color: token.colorPrimary,
                    'font-weight': 600,
                    'font-size': '32px'
                })}
            >
                容(需)量用电价格
            </View>
            <Table
                columns={[
                    {
                        title: ["用电价格", "电压等级"],
                        type: "multiple",
                        key: "multiple"
                    },
                    {
                        title: "基本电价按需价格",
                        key: "spring"
                    },
                    {
                        title: "基本电价按容价格",
                        key: "summer"
                    }
                ]
                }
                dataSource={
                    [
                        {
                            multiple: '220千伏及以上',
                            spring: '143',
                            summer: '115'
                        }
                    ]
                }
            />
        </View>
    )
}

export default ElectricityPrice;