import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useState } from "react";
import { Select } from "@/components";
import { AtButton } from "taro-ui";
import { getFirstArea } from '@/services/area';
import { Echarts, Table } from "@/components";
import "./index.scss";

const ElectricityPrice = (props) => {
    const { token } = props;
    const [selector, setSelector] = useState({
        firstArea: [ ],
        secondArea: [{
            value: 'china',
            label: '中国'
        }],
        electricityType: [{
            value: 'type01',
            label: '大工业商业用电'
        }, {
            value: 'type02',
            label: '一般商业用电'
        }],
        zd: [{
            value: 'zd01',
            label: '单一制'
        }, {
            value: 'zd02',
            label: '两部制'
        }],
        dj: [{
            value: 'dj01',
            label: '不满35千伏'
        }, {
            value: 'dj02',
            label: '1千伏'
        }]
    })
    const [value, setValue] = useState({
        firstArea: '',
        secondArea: ''
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
            onChange('firstArea', res?.data?.map(item => ({
                label: item.name,
                value: item?.id
            })))
        }
    }

    initFirstArea()

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
                options={selector["firstArea"]}
                placeholder={"请选择一级区域"}
                onChange={(value) => onChange('firstArea', value)}
            />
            <Select
                value={value["secondArea"]}
                label="二级区域"
                options={selector["secondArea"]}
                placeholder={"请选择二级区域"}
                onChange={(value) => onChange('secondArea', value)}
            />
            <Select
                value={value["electricityType"]}
                label="用电类型"
                options={selector["electricityType"]}
                placeholder={"请选择用电类型"}
                onChange={(value) => onChange('electricityType', value)}
            />
            <Select
                value={value["zd"]}
                label="计费制度"
                options={selector["zd"]}
                placeholder={"请选择计费制度"}
                onChange={(value) => onChange('zd', value)}
            />
            <Select
                value={value["dj"]}
                label="电压等级"
                options={selector["dj"]}
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