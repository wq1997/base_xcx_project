import { AtSwitch } from 'taro-ui'
import {connect} from "react-redux";
import { useEffect } from "react";
import { setTabBarStyle } from "@tarojs/taro"

const ThemeBtn = (props) => {
    const { dispatch, app, token } = props;
    const { theme } = app;
    const isDark = theme==="dark";
    const onChange = (isDark) => {
        dispatch({
            type: 'app/changeTheme',
            payload: {
                theme: isDark?"dark":"default"
            }
        })
    }

    useEffect(()=>{
        setTabBarStyle({
            color: token.color,
            backgroundColor: token.backgroundColor,
            selectedColor: token.color
        })
    }, [token])

    return (
        <AtSwitch 
            checked={isDark}
            title={isDark?"浅色模式":"深色模式"}
            onChange={onChange}
        />
    )
}

export default connect(({
    app
})=>({ 
    app
}))(ThemeBtn);