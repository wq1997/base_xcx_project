import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useState, useEffect } from "react";

const Checkbox = (props) => {
    const { options, token, onChange } = props;
    const [newOptions, setNewOptions] = useState([]);

    if(!(options&&Array.isArray(options))){
        return (
            <View />
        )
    }
    const onChangeCheckbox = (value, checked) =>{ 
        const index = newOptions.findIndex(checkbox => checkbox.value === value);
        newOptions[index].checked = checked;
        onChange([...newOptions]);
    }
    useEffect(()=>{
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
                            onClick={()=>{
                                onChange&&onChangeCheckbox(option.value, !option.checked)
                            }}
                        >
                            <View
                                style={Func.getStyles({
                                    border:`1px solid ${token.colorPrimary}`,
                                    background: option.checked ? token.colorPrimary : 'white',
                                    width: '35px',
                                    height: '35px',
                                    'margin-right': '10px',
                                    'border-radius': '8px',
                                    position: 'relative',
                                    'text-align': 'center'
                                })}
                            >
                               {
                                 option.checked&&
                                    <View 
                                        style={Func.getStyles({
                                            position: 'relative',
                                            'font-weight': 600,
                                            'line-height': '35px',
                                            color: 'white'
                                        })}
                                    >
                                        <View>√</View>
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