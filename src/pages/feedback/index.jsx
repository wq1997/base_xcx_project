import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import { useEffect, useState } from "react";
import { Radio, UploadImage } from "@/components";
import { AtButton, AtTextarea } from 'taro-ui'
import Taro from "@tarojs/taro";
import Tips from '@/utils/tips';
import { getFeedbackType, addFeedback } from '@/services/feedback';

const Feedback = (props) => {
    const { token } = props;
    const [checkboxList, setCheckboxList] = useState([])
    const [text, setText] = useState(undefined);
    const [fileNames, setFileNames] = useState([]);

    const onChangeImages = (files) => {
        console.log(files);
    }

    const initFeedbackType = async () => {
        const res = await getFeedbackType()
        if (res?.code == 200) {
            setCheckboxList(res?.data?.map(item => ({
                label: item.name,
                value: item.value,
                checked: false
            })) || [])
        }
    }

    useEffect(() => initFeedbackType(), [])

    const submit = async () => {
        const feedbackType = checkboxList.find(item => item.checked)?.value
        if (!feedbackType) return Tips.toast('请选择反馈类型');
        if (!text?.trim()) return Tips.toast('请输入反馈与建议');
        const res = await addFeedback({
            feedbackType,
            text,
            files: fileNames
        })
        if (res?.code == 200) {
            Tips.toast('添加成功');
            Taro.switchTab({
                url: '/pages/mine/index'
            });
        }
    }

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
                <Radio
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
                    value={text}
                    onChange={(value) => setText(value)}
                    maxLength={400}
                    placeholder='请输入你的建议...'
                />
            </View>
            <UploadImage fileNames={fileNames} setFileNames={setFileNames} />
            <View
                style={Func.getStyles({
                    "margin-top": '80px',
                })}
            >
                <AtButton type="primary" onClick={submit}>提交</AtButton>
            </View>
        </View>
    )
}

export default Feedback;