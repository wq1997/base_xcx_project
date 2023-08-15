import { AtIcon } from "taro-ui";

const Icon = ({type, ...rest}) => {
    return (
        <AtIcon 
            prefixClass="icon" 
            value={type} 
            {...rest}
        />
    )
}

export default Icon;