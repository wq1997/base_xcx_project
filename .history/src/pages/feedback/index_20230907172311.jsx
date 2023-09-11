import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useState } from "react";
import { Checkbox, UploadImage } from "@/components";
import { AtButton, AtTextarea } from 'taro-ui'
import Taro from "@tarojs/taro";
import Tips from '@/utils/tips';
import { getFeedbackType } from '@/services/feedback';

const Feedback = (props) => {
    const { token } = props;
    const [checkboxList, setCheckboxList] = useState([
        {
            value: 'type01',
            label: '小程序使用问题',
            checked: false
        },
        {
            value: 'type02',
            label: '内容修正',
            checked: false
        },
        {
            value: 'type03',
            label: '其他建议',
            checked: false
        }
    ])
    const [question, setQuestion] = useState("");
    const [files, setFiles] = useState([]);

    const onChangeImages = (files) => {
        console.log(files);
    }

    const initFeedbackType = async () => {
        let res = await getFeedbackType()
        if (res?.code == 200) {
            setCheckboxList(res?.data)
        }

    }
    initFeedbackType()

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color,
                padding: '24px'
            })}
        >
            <View
                style={Func.getStyles({
                    "margin-bottom": '80px',
                })}
            >
                <View
                    style={Func.getStyles({
                        color: token.colorPrimary,
                        "margin-bottom": '25px',
                        "font-size": '32px',
                        "font-weight": 600
                    })}
                >
                    反馈类型
                </View>
                <Checkbox
                    options={checkboxList}
                    token={token}
                    onChange={(options) => {
                        setCheckboxList(options)
                    }}
                />
            </View>
            <View
                style={Func.getStyles({
                    "margin-bottom": '80px',
                })}
            >
                <View
                    style={Func.getStyles({
                        color: token.colorPrimary,
                        "margin-bottom": '25px',
                        "font-size": '32px',
                        "font-weight": 600
                    })}
                >
                    反馈与建议
                </View>
                <AtTextarea
                    value={question}
                    onChange={(value) => setQuestion(value)}
                    maxLength={400}
                    placeholder='请输入你的建议...'
                />
            </View>
            <UploadImage maxLength={6} />
            <View
                style={Func.getStyles({
                    "margin-top": '80px',
                })}
            >
                <AtButton type="primary">提交</AtButton>
            </View>
        </View>
    )
}

export default Feedback;