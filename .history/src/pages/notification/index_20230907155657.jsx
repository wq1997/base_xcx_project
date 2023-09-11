import { View } from "@tarojs/components"
import { useState, useEffect } from "react";
import Func from "@/utils/Func";
import { getPolicyList } from '@/services/policy';

let flag = true

const Notification = (props) => {
    const { token } = props;
    const [current, setCurrent] = useState(1);
    const [list, setList] = useState([]);

    const getList = async () => {
        Taro.showLoading({
            title: '正在加载中...'
        });
        let res = await getPolicyList({
            current,
            size: 10,
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

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px'
            })}
        >
            {list.map(notification => {
                return (
                    <View
                        style={Func.getStyles({
                            'margin-bottom': '20px',
                            padding: '24px',
                            border: `1px solid ${token.colorBorder}`,
                            'border-radius': '16px'
                        })}
                    >
                        <View>推进新能源和清洁能源车辆规模化应用，2023年新增或更新新能源公交车、出租车1.1万辆，全省主城区新能源公交车、出租车占比均超过70%。</View>
                        <View
                            style={Func.getStyles({
                                'margin-top': '20px',
                                color: '#ccc',
                                "font-size": '20px'
                            })}
                        >
                            2023-08-03 13：10：11
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default Notification;