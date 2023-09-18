import { View } from "@tarojs/components"
import Func from "@/utils/Func";

const LinearButton = (props) => {
    const { style, title, onClick } = props;

    return <View
        onClick={onClick}
        style={Func.getStyles({
            background: 'linear-gradient(to bottom, #27E0CE 20%, #32B9CD 80%)',
            color: '#fff',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'border-radius': '10px',
            height: '95px',
            ...style
        })}

    >
        {title}
    </View>
}

export default LinearButton;

