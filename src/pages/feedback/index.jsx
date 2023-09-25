import { View } from '@tarojs/components';
import Func from '@/utils/Func';
import { useEffect, useState } from 'react';
import { Radio, UploadImage, LinearButton } from '@/components';
import { AtButton, AtTextarea } from 'taro-ui';
import Taro from '@tarojs/taro';
import Tips from '@/utils/tips';
import { getFeedbackType, addFeedback } from '@/services/feedback';
import './index.scss';

const Feedback = (props) => {
    const { token } = props;
    const [checkboxList, setCheckboxList] = useState([]);
    const [text, setText] = useState(undefined);
    const [fileNames, setFileNames] = useState([]);

    const onChangeImages = (files) => {
        console.log(files);
    };

    const initFeedbackType = async () => {
        const res = await getFeedbackType();
        if (res?.code == 200) {
            setCheckboxList(
                res?.data?.map((item) => ({
                    label: item.name,
                    value: item.value,
                    checked: false
                })) || []
            );
        }
    };

    useEffect(() => initFeedbackType(), []);

    const submit = async () => {
        const feedbackType = checkboxList.find((item) => item.checked)?.value;
        if (!feedbackType) return Tips.toast('请选择反馈类型');
        if (!text?.trim()) return Tips.toast('请输入反馈与建议');
        const res = await addFeedback({
            feedbackType,
            text,
            files: fileNames
        });
        if (res?.code == 200) {
            Tips.toast('添加成功');
            setTimeout(() => {
                Taro.switchTab({
                    url: '/pages/mine/index'
                });
            }, 1000)
        }
    };

    return (
        <View
            style={Func.getStyles({
                background: '#F8F8F8',
                color: token.color,
                padding: '24px',
                height: '100vh',
                'box-sizing': 'border-box'
            })}
        >
            <View
                style={Func.getStyles({
                    'margin-bottom': '40px',
                    backgroundColor: '#fff',
                    padding: '24px',
                    'border-radius': '16px'
                })}
            >
                <View
                    style={Func.getStyles({
                        'margin-bottom': '25px',
                        'font-size': '32px',
                        'font-weight': 600,
                        'padding-bottom': '16px',
                        'border-bottom': '1px solid #EAF1F7',
                        display: 'flex'
                    })}
                >
                    <View
                        style={Func.getStyles({
                            width: '10px',
                            height: '84',
                            background: 'linear-gradient(to right, #27E0CE 20%, #32B9CD 80%)',
                            'margin-right': '20px'
                        })}
                    ></View>
                    反馈类型
                </View>
                <View
                    style={Func.getStyles({
                        margin: '50px 0 24px 0 '
                    })}
                >
                    <Radio
                        options={checkboxList}
                        token={token}
                        onChange={(options) => {
                            setCheckboxList(options);
                        }}
                    />
                </View>
            </View>
            <View
                style={Func.getStyles({
                    'margin-bottom': '40px',
                    backgroundColor: '#fff',
                    padding: '24px',
                    'border-radius': '16px'
                })}
            >
                <View
                    style={Func.getStyles({
                        'margin-bottom': '25px',
                        'font-size': '32px',
                        'font-weight': 600,
                        'padding-bottom': '16px',
                        'border-bottom': '1px solid #EAF1F7',
                        display: 'flex'
                    })}
                >
                    {' '}
                    <View
                        style={Func.getStyles({
                            width: '10px',
                            height: '84',
                            background: 'linear-gradient(to right, #27E0CE 20%, #32B9CD 80%)',
                            'margin-right': '20px'
                        })}
                    ></View>
                    反馈与建议
                </View>
                <AtTextarea
                    value={text}
                    onChange={(value) => {
                        if (value?.length == 400) {
                            setText(value)
                            return Tips.toast('最多输入400个字符');
                        }
                        setText(value)
                    }}
                    maxLength={400}
                    placeholder="请输入您的建议..."
                />
            </View>
            <UploadImage fileNames={fileNames} setFileNames={setFileNames} />
            <View
                style={Func.getStyles({
                    'margin-top': '40px'
                })}
            >
                <LinearButton
                    onClick={() => {
                        submit();
                    }}
                    title="提交"
                />
            </View>
        </View>
    );
};

export default Feedback;
