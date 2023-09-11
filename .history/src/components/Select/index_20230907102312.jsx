import { View, Picker } from "@tarojs/components";
import { useState, useEffect } from "react";
import Func from "@/utils/Func";

const Select = ({
    label,
    options,
    onChange,
    placeholder,
    value
}) => {
    const [range, setRange] = useState([]);
    const [valueLabel, setValueLabel] = useState("");
    const [current, setCurrent] = useState();
    useEffect(() => {
        const newRange = options && options.map(option => option?.label);
        setRange(newRange);
    }, [JSON.stringify(options)])

    useEffect(() => {
        const index = options && options.findIndex(option => option?.value === value);
        // setCurrent(index >= 0 ? index : 0);
        console.log('index',index)
        if (index >= 0) {
            setCurrent(index)
        } else {
            setCurrent()
        }
    }, [value])

    const onChangePicker = (e) => {
        const value = e.target.value;
        console.log(index)
        setValueLabel(options[value]?.label);
        onChange && onChange(options[value]?.value);
    }

    return (
        <Picker mode='selector' range={range} value={current} onChange={onChangePicker}>
            <View
                style={Func.getStyles({
                    display: 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center',
                    'padding-Bottom': '24px',
                    'padding-top': '24px',
                    "border-bottom": '1px solid #EAF1F7'
                })}
            >
                <View style={Func.getStyles({
                    "font-size": '30px'
                })}>{label}</View>
                <View
                    style={Func.getStyles({
                        color: valueLabel ? "#000" : '#ccc',
                        'font-size': '32px'
                    })}
                >
                    {valueLabel || placeholder}
                </View>
            </View>
        </Picker>
    )
}

export default Select;