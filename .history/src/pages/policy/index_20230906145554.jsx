import { View, ScrollView } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtSearchBar } from 'taro-ui';
import Func from "@/utils/Func";
import Tips from '@/utils/tips';
import { getPolicyList } from '@/services/policy';
import { PolicyCard } from "@/components";
import Taro from "@tarojs/taro";
import "./index.scss";

let flag = true
const Threshold = 150;

const Policy = (props) => {
    const { token } = props;
    const [current, setCurrent] = useState(1);
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
            current,
            size: 10,
            name: keyword
        })
        if (res?.code == 200) {
            const { records } = res?.data
            if (records?.length) {
                setList([
                    ...(current == 1 ? [] : list),
                    ...records
                ])
            } else {
                if (current == 1) setList([])
                flag = false
                setCurrent(current - 1)
                Tips.toast('暂无更多数据');
            }
        }
        Taro.hideLoading();
    }

    useEffect(() => {
        if (flag) {
            getList()
        }
        flag = true
    }, [current])

    const handleSearch = () => {
        setCurrent(1)
        if (current == 1) {
            getList()
        }
    }

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
                placeholder='请输入政策标题'
                value={keyword}
                onChange={onChange}
                onClear
                onClear={}
                onActionClick={handleSearch}
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
                onScrollToLower={() => setCurrent(current + 1)}
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