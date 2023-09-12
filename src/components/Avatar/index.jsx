import { View } from '@tarojs/components';
import Func from "@/utils/Func";
import { getCurrentUser } from '@/utils/authTools';

const Avatar = () => {
    const { nickName } = getCurrentUser();

    return (
        <View
            style={Func.getStyles({
                width: '100px',
                height: '100px',
                'border-radius': '50%',
                display: 'flex',
                'background-color': '#7F3BFF',
                'justify-content': 'center',
                'align-items': 'center'
            })}
        >
            <View 
                style={Func.getStyles({
                    color: 'white',
                    'font-weight': 600
                })}
            >
                {nickName?nickName.slice(-2):''}
            </View>
        </View>
    )
}

export default Avatar;