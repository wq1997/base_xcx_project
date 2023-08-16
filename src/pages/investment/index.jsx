import { View } from "@tarojs/components"
import { Select } from "@/components";
import { AtButton, AtInput } from "taro-ui";
import { useState } from "react";
import Func from "@/utils/Func";
import Taro from "@tarojs/taro";
import "./index.scss";

const Investment = (props) => {
    const { token } = props;
    const [selector, setSelector] = useState({
        firstArea: [{
            value: 'china',
            label: '中国'
        },{
            value: 'Americal',
            label: '美国'
        }],
        secondArea: [{
            value: 'china',
            label: '中国'
        }],
        electricityType: [{
            value: 'type01',
            label: '大工业商业用电'
        },{
            value: 'type02',
            label: '一般商业用电'
        }],
        zd: [{
            value: 'zd01',
            label: '单一制'
        },{
            value: 'zd02',
            label: '两部制'
        }],
        dj: [{
            value: 'dj01',
            label: '不满35千伏'
        },{
            value: 'dj02',
            label: '1千伏'
        }]
    });
    const [value, setValue] = useState({
        firstArea: '',
        secondArea: '',
        zjrl: ''
    });

    const onChange = (type, currentValue) => {
        console.log("AAAA", type, currentValue)
        setValue({
            ...value,
            [type]: currentValue
        })
    }

    console.log("AAA", value);

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
                options={selector["firstArea"]}
                placeholder={"请选择一级区域"} 
                onChange={(value)=>onChange('firstArea', value)}
            />
            <Select 
                value={value["secondArea"]}
                label="二级区域" 
                options={selector["secondArea"]}
                placeholder={"请选择二级区域"} 
                onChange={(value)=>onChange('secondArea', value)}
            />
            <Select 
                value={value["electricityType"]}
                label="用电类型" 
                options={selector["electricityType"]}
                placeholder={"请选择用电类型"} 
                onChange={(value)=>onChange('electricityType', value)}
            />
            <Select 
                value={value["zd"]}
                label="计费制度" 
                options={selector["zd"]}
                placeholder={"请选择计费制度"} 
                onChange={(value)=>onChange('zd', value)}
            />
            <Select 
                value={value["dj"]}
                label="电压等级" 
                options={selector["dj"]}
                placeholder={"请选择电压等级"} 
                onChange={(value)=>onChange('dj', value)}
            />
            <AtInput
                name="zjrl"
                title='装机容量'
                placeholder='请输入装机容量 kWh'
                value={value["zjrl"]}
                onChange={(value)=>onChange("zjrl", value)}
            />
            <AtInput
                title='项目周期'
                value="20年"
                disabled
            />
            <AtInput
                title='业主分成比例'
                value="0%(自营)"
                disabled
            />
            <AtInput
                title='首付比例'
                value="100%"
                disabled
            />
            <View style={Func.getStyles({
                "margin-top": '30px'
            })}>
                <AtButton 
                    type='primary'
                    onClick={()=>{
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