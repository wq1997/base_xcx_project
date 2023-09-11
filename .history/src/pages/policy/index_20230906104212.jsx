import { View, ScrollView } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtSearchBar } from 'taro-ui';
import Func from "@/utils/Func";
import Tips from '@/utils/tips';
import { getPolicyList } from '@/services/policy';
import { PolicyCard } from "@/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Threshold = 150;

const Policy = (props) => {
    const { token } = props;
    const [current, setCurrent] = useState(0);
    const [list, setList] = useState([]);
    const [keyword, setKeyword] = useState("");

    const onChange = (value) => {
        setKeyword(value);
    }

    const getList = async () => {
        Taro.showLoading({
            title: '正在加载中...'
        });
        let res = await getPolicyList({
            current: current + 1,
            size: 10
        })
        if (res?.code == 200) {
            const { records } = res?.data
            if (records?.length) {
                setCurrent(current + 1)
                setList([
                    ...list,
                    ...records
                ])
            } else {
                Tips.toast('暂无更多数据');
            }
        }
        Taro.hideLoading();
    }

    useEffect(() => getList(), [])

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
                onActionClick={getList}
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
                onScrollToLower={getList}
            >
                {
                    list.map(item =>
                        <View
                            style="margin-bottom: 10px"
                            onClick={() => {
                                Taro.navigateTo({
                                    url: `/pages/policyDetail/index?listItem=${encodeURIComponent(JSON.stringify(item))}`
                                })
                            }}
                        >
                            <PolicyCard token={token} listItem={item} />
                        </View>)
                }
            </ScrollView>
        </View>
    )
}

export default Policy;