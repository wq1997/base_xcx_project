import { View, ScrollView } from "@tarojs/components";
import { useState } from "react";
import { AtSearchBar } from 'taro-ui';
import Func from "@/utils/Func";
import { getPolicyList } from '@/services/policy';
import { PolicyCard } from "@/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Threshold = 150;

const Policy = (props) => {
    const { token } = props;
    const [keyword, setKeyword] = useState("");

    const onChange = (value) => {
        setKeyword(value);
    }

    const getPolicyList

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px'
            })}
            className="policy"
        >
            <AtSearchBar
                value={keyword}
                onChange={onChange}
            />
            <ScrollView
                className='scrollview'
                scrollY
                scrollWithAnimation
                style={{
                    width: '100%',
                    height: 'calc(100vh - 170rpx)',
                    marginTop: '10px'
                }}
                upperThreshold={Threshold}
                onScrollToLower={() => {
                    Taro.showLoading({
                        title: '正在加载中...'
                    });
                    setTimeout(() => {
                        Taro.hideLoading();
                    }, 2000)
                    console.log("上拉加载")
                }}
            >
                {
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(item =>
                        <View
                            style="margin-bottom: 10px"
                            onClick={() => {
                                Taro.navigateTo({
                                    url: `/pages/policyDetail/index`
                                })
                            }}
                        >
                            <PolicyCard token={token} />
                        </View>)
                }
            </ScrollView>
        </View>
    )
}

export default Policy;