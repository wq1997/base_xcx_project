import { Input, View } from '@tarojs/components';
import "./index.scss";

const MyInput = (props) => {
    const { onChange } = props
    return (
        <View className='myInput'>
            <Input 
                {...props} 
                placeholderClass='placeholder'
                onInput={e=>{
                    onChange&&onChange(e.detail.value)
                }} 
            />
        </View>
    )
}

export default MyInput;