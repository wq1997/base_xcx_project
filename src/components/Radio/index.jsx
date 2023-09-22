import { View, Image } from "@tarojs/components"
import Func from "@/utils/Func";
import { useState, useEffect } from "react";
import { PUBLIC_FILE_PATH } from "@/utils/constants";

const Checkbox = (props) => {
    const { options, token, onChange } = props;
    const [newOptions, setNewOptions] = useState([]);

    if (!(options && Array.isArray(options))) {
        return (
            <View />
        )
    }
    const onChangeCheckbox = (value,) => {
        const index = newOptions.findIndex(checkbox => checkbox.value === value);
        const _newOptions = newOptions.map((item, itemIndex) => ({
            ...item,
            checked: index == itemIndex
        }))
        onChange([..._newOptions]);
    }
    useEffect(() => {
        setNewOptions(options)
    }, [options])
    return (
        <View
            style={Func.getStyles({
                display: 'flex'
            })}
        >
            {
                newOptions.map(option => {
                    return (
                        <View
                            style={Func.getStyles({
                                display: 'flex',
                                'margin-right': '20px',
                                'align-items': 'center'
                            })}
                            onClick={() => {
                                onChange && onChangeCheckbox(option.value,)
                            }}
                        >
                            <View
                                style={Func.getStyles({
                                    border: `2px solid ${token.colorPrimary}`,
                                    background: option.checked ? token.colorPrimary : 'white',
                                    background: '#fff',
                                    width: '35px',
                                    height: '35px',
                                    'margin-right': '10px',
                                    'border-radius': '50%',
                                    position: 'relative',
                                    'text-align': 'center',
                                    display: 'flex',
                                    'justify-content': 'center',
                                    'align-items': 'center',
                                    'box-sizing': 'border-box'
                                })}
                            >
                                {
                                    option.checked &&
                                    <View
                                        style={Func.getStyles({
                                            position: 'relative',
                                            background: token.colorPrimary,
                                            width: '20px',
                                            height: '20px',
                                            'border-radius': '50%',
                                        })}
                                    >
                                    </View>
                                }
                            </View>
                            <View
                                style={Func.getStyles({
                                    'font-size': '30px',
                                    color: '#999'
                                })}
                            >{option.label}</View>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default Checkbox;