import { View } from '@tarojs/components';
import {connect} from "react-redux";
import themeConstants from './theme.constants';
import React from "react";

const ThemeProvider = (props) => {
    const { app } = props;
    const theme = app.theme;
    return (
        <View>
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child, {
                        token: themeConstants[theme]
                    })
                })
            }
        </View>
    )
}

export default connect(({app})=>({app}))(ThemeProvider);