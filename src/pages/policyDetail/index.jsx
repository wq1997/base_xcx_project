import { View, Text } from '@tarojs/components';
import { Header } from '@/components';
import Func from '@/utils/Func';
import Tips from '@/utils/tips';
import Taro from '@tarojs/taro';

const PolicyDetail = (props) => {
    const { token } = props;
    const { router } = Taro.getCurrentInstance();
    const listItem = JSON.parse(decodeURIComponent(router?.params?.listItem));
    const { top, height } = Taro.getMenuButtonBoundingClientRect();

    const handleCopy = (link) => {
        Taro.setClipboardData({
            data: link,
            success: function (res) {
                Tips.toast('链接已复制，请粘贴到浏览器中打开');
            }
        });
    };

    return (
        <View
            style={Func.getStyles({
                background: token.backgroundColor,
                color: token.color
            })}
        >
            <Header title="政策详情"></Header>
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    'text-align': 'center',
                    'font-size': '32px',
                    'font-weight': 700,
                    background: 'linear-gradient(to bottom, #4A4CF7 20%, #16A8EA 70%)',
                    height: '300px',
                    color: '#fff',
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    padding: '0 30px',
                    'padding-top': 2 * (top + height) - 50 + 'px'
                })}
            >
                {listItem?.policyName}
            </View>
            <View
                style={Func.getStyles({
                    'margin-bottom': '60px',
                    'font-size': '30px',
                    'line-height': '60px',
                    padding: '30px',
                    'border-radius': '50px 50px 0 0 ',
                    backgroundColor: '#fff',
                    position: 'relative',
                    top: '-50px'
                })}
            >
                <View
                    style={Func.getStyles({
                        display: 'flex',
                        'justify-content': 'space-between',
                        'align-items': 'center',
                        'margin-bottom': '50px'
                    })}
                >
                    <View
                        style={Func.getStyles({
                            padding: '0 10px',
                            'background-color': '#F8B62C',
                            color: 'white',
                            'border-radius': '4px',
                            'font-size': '20px'
                        })}
                    >
                        {listItem?.issueUnit}
                    </View>
                    <View
                        style={Func.getStyles({
                            'font-size': '20px',
                            'font-weight': 'bold'
                        })}
                    >
                        {listItem?.releaseTime}
                    </View>
                </View>
                <View
                    style={Func.getStyles({
                        color: token.colorPrimary,
                        'margin-bottom': '30px',
                        'text-align': 'center',
                        'font-size': '32px',
                        'font-weight': 600
                    })}
                >
                    政策摘要
                </View>
                <View
                    style={Func.getStyles({
                        'margin-bottom': '60px',
                        'font-size': '30px',
                        'line-height': '60px'
                    })}
                >
                    {listItem?.policyPoints}
                </View>
                <View
                    style={Func.getStyles({
                        color: token.colorPrimary,
                        'margin-bottom': '30px',
                        'text-align': 'center',
                        'font-size': '32px',
                        'font-weight': 600
                    })}
                >
                    政策解读
                </View>
                <View
                    style={Func.getStyles({
                        'margin-bottom': '60px',
                        'font-size': '30px',
                        'line-height': '60px'
                    })}
                >
                    {listItem?.policyAnalyse}
                </View>
                <View style={Func.getStyles({
                    width: '100%',
                    'margin-bottom': '30px',
                    'font-size': '30px',
                    'text-align': 'center',
                })}>
                    请点击
                    <Text
                        onClick={() => {
                            handleCopy(listItem?.originalLink);
                        }}
                        style={Func.getStyles({
                            color: '#2395f1'
                        })}
                    >
                        政策原文
                    </Text>复制链接，在浏览器中打开
                </View>

            </View>
        </View>
    );
};

export default PolicyDetail;
