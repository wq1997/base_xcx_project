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
                                    border: `1px solid ${token.colorPrimary}`,
                                    background: option.checked ? token.colorPrimary : 'white',
                                    width: '35px',
                                    height: '35px',
                                    'margin-right': '10px',
                                    'border-radius': '50%',
                                    position: 'relative',
                                    'text-align': 'center'
                                })}
                            >
                                {
                                    option.checked &&
                                    <View
                                        style={Func.getStyles({
                                            position: 'relative',
                                        })}
                                    >
                                        <Image 
                                            src={`${PUBLIC_FILE_PATH}duihao.svg`} 
                                            style={Func.getStyles({
                                                width: '50px',
                                                height: '50px',
                                                position: 'relative',
                                                top: '-6px',
                                                left: '-6px'
                                            })}
                                        />
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