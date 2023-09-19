import { View } from '@tarojs/components';
import Func from '@/utils/Func';
import { useEffect, useState } from 'react';
import { Select, LinearButton, Echarts, Table } from '@/components';
import Tips from '@/utils/tips';
import { getFirstArea, getSecondArea } from '@/services/area';
import { AtIcon, AtToast } from 'taro-ui';
import {
    getElectricType,
    getBillingSystem,
    getVolLevel,
    getElectricPrice
} from '@/services/electric';
import './index.scss';

const colorList = ['#ED1C22', '#F8931D', '#61a0a8', '#8CC63E', '#8CC63E'];
const baseEchartXLabel = ['尖峰电价', '高峰电价', '平时电价', '低谷电价'];
const baseTypePriceColumns = [
    {
        title: ['电压等级', '电压等级'],
        type: 'multiple',
        key: 'multiple'
    },
    {
        title: '尖峰电价',
        key: 'cuspPrice'
    },
    {
        title: '高峰电价',
        key: 'highPrice'
    },
    {
        title: '平时电价',
        key: 'flatPrice'
    },
    {
        title: '低谷电价',
        key: 'lowPrice'
    }
];

const ElectricityPrice = (props) => {
    const { token } = props;
    const [typePriceColumns, setTypePriceColumns] = useState([...baseTypePriceColumns]);
    const [echartXLabel, setEchartXLabel] = useState([...baseEchartXLabel]);
    const [echartData, setEchartData] = useState([]);
    const [remarkDate, setRemarkDate] = useState();
    const [isOpened, setIsOpened] = useState(false);
    const [firstAreaOptions, setFirstAreaOptions] = useState([]);
    const [secondAreaOptions, setSecondAreaOptions] = useState([]);
    const [electricityTypeOptions, setElectricityTypeOptions] = useState([]);
    const [billingSystemOptions, setBillingSystemOptions] = useState([]);
    const [volLevelOptions, setVolLevelOptions] = useState([]);
    const [table1DataSource, setTable1DataSource] = useState([]);
    const [table2DataSource, setTable2DataSource] = useState([]);

    const [value, setValue] = useState({
        firstArea: undefined,
        secondArea: undefined,
        electricityType: undefined,
        cost: undefined,
        level: undefined
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
                cost: currentValue
            });
        }
        if (type == 'level') {
            setValue({
                ...value,
                [type]: currentValue
            });
        }
    };

    useEffect(() => {
        initOptions(getFirstArea, setFirstAreaOptions);
    }, []);

    const handleSearch = async () => {
        const { firstArea, secondArea, electricityType, cost, level } = value;
        if (!firstArea) return Tips.toast('请选择一级区域');
        if (!secondArea) return Tips.toast('请选择二级区域');
        if (!electricityType) return Tips.toast('请选择用电类型');
        if (!cost) return Tips.toast('请选择计费制度');
        if (!level) return Tips.toast('请选择电压等级');
        Tips.loading('loading...');
        const res = await getElectricPrice({
            districtOneId: firstArea,
            districtTwoId: secondArea,
            electricityTypeId: electricityType,
            costId: cost,
            voltageLevelId: level
        });
        if (res?.code == 200) {
            const {
                remarkDate,
                cuspPrice,
                highPrice,
                flatPrice,
                lowPrice,
                deepValleyPrice,
                capacityPrice,
                needPrice,
                voltageLevel
            } = res?.data;
            const baseTypePriceItem = { cuspPrice, highPrice, flatPrice, lowPrice };
            setRemarkDate(remarkDate);
            if (deepValleyPrice) {
                setTable1DataSource([
                    {
                        multiple: voltageLevel,
                        ...baseTypePriceItem,
                        deepValleyPrice
                    }
                ]);
                setTypePriceColumns([
                    ...baseTypePriceColumns,
                    {
                        title: '深谷电价',
                        key: 'deepValleyPrice'
                    }
                ]);
                setEchartXLabel([...baseEchartXLabel, '深谷电价']);
                setEchartData([...Object.values(baseTypePriceItem), deepValleyPrice]);
            } else {
                setTable1DataSource([
                    {
                        multiple: voltageLevel,
                        ...baseTypePriceItem
                    }
                ]);
                setTypePriceColumns([...baseTypePriceColumns]);
                setEchartXLabel([...baseEchartXLabel]);
                setEchartData(Object.values(baseTypePriceItem));
            }
            setTable2DataSource([
                {
                    multiple: voltageLevel,
                    capacityPrice: capacityPrice,
                    needPrice: needPrice
                }
            ]);
        } else {
            setRemarkDate();
            setEchartData([]);
            setTable1DataSource([]);
            setTable2DataSource([]);
        }
        Tips.loaded('loading...');
    };

    return (
        <View
            style={Func.getStyles({
                padding: '24px'
            })}
            className="electricityPrice"
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
            <View
                style={Func.getStyles({
                    'margin-top': '30px'
                })}
            >
                <LinearButton onClick={handleSearch} title="查询区域电价（/元）" />
            </View>
            {remarkDate && (
                <View
                    style={Func.getStyles({
                        display: 'flex',
                        'justify-content': 'flex-end',
                        'margin-top': '20px',
                        position: 'relative'
                    })}
                >
                    {isOpened && (
                        <View
                            style={Func.getStyles({
                                width: '60%',
                                'min-width': '400px',
                                'line-height': '45px',
                                padding: '10px 20px',
                                'border-radius': '10px',
                                background: '#000',
                                'font-size': '25px',
                                color: '#fff',
                                'margin-right': '20px',
                                position: 'absolute',
                                left: '20%',
                                'z-index': 999,
                                top: '-160px'
                            })}
                        >
                            {remarkDate}
                        </View>
                    )}
                    <AtIcon
                        value={isOpened ? "close-circle" : "help"}
                        size="20"
                        color="#3F536E"
                        onClick={() => setIsOpened(!isOpened)}
                    ></AtIcon>
                </View>
            )}
            <View className="echartsContent">
                <Echarts
                    style={{
                        width: '100%',
                        height: '300px'
                    }}
                    option={{
                        tooltip: {},
                        grid: {
                            top: 30,
                            bottom: 30,
                            left: 30,
                            right: 5
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: echartXLabel,
                                axisLabel: {
                                    interval: 0 //代表显示所有x轴标签显示
                                }
                            }
                        ],
                        yAxis: {
                            type: 'value',
                            show: true
                        },
                        series: [
                            {
                                data: echartData,
                                type: 'bar',
                                barWidth: 30,
                                itemStyle: {
                                    normal: {
                                        color: (params) => colorList[params.dataIndex]
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true, //开启显示
                                        position: 'top' //柱形上方
                                    }
                                }
                            }
                        ]
                    }}
                />
                {echartData?.length === 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#ccc'
                        }}
                    >
                        暂无数据
                    </View>
                )}
            </View>
            <Table columns={typePriceColumns} colorList={colorList} dataSource={table1DataSource} />
            <View
                style={Func.getStyles({
                    'text-align': 'center',
                    margin: '20px 0',
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
                        title: ['电压等级', '容(需)量用电价格'],
                        type: 'multiple',
                        key: 'multiple'
                    },
                    {
                        title: '基本电价按需价格',
                        key: 'capacityPrice'
                    },
                    {
                        title: '基本电价按容价格',
                        key: 'needPrice'
                    }
                ]}
                colorList={[token.colorPrimary, token.colorPrimary]}
                dataSource={table2DataSource}
            />
        </View>
    );
};

export default ElectricityPrice;
