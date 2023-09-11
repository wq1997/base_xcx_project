import { View } from "@tarojs/components"
import Func from "@/utils/Func";
import Taro from "@tarojs/taro";

const PolicyDetail = (props) => {
    const { token } = props;
    console.log(Taro.getCurrentInstance())
    
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
                    color: token.colorPrimary,
                    "margin-bottom": '60px',
                    "text-align": 'center',
                    "font-size": '32px',
                    "font-weight": 700
                })}
            >
                《关于加快推动新型储能产业高质量发展的指导意见（征求意见稿）的函》
            </View>
            <View
                style={Func.getStyles({
                    display: 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center',
                    "margin-bottom": '60px'
                })}
            >
                <View
                    style={Func.getStyles({
                        padding: '10px',
                        "background-color": token.colorPrimary,
                        color: 'white',
                        "border-radius": '4px',
                        "font-size": '20px'
                    })}
                >
                    湖北省能源局
                </View>
                <View
                    style={Func.getStyles({
                        "font-size": '20px'
                    })}
                >
                    2023年07月05日
                </View>
            </View>
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    "margin-bottom": '30px',
                    "text-align": 'center',
                    "font-size": '32px',
                    "font-weight": 600
                })}
            >
                政策摘要
            </View>
            <View
                style={Func.getStyles({
                    "margin-bottom": '60px',
                })}
            >
                到2025年，新型储能电站装机规模达到300万千瓦，全省新型储能产业营业收入达到4000亿元以上。完善延伸锂电产业链优势。加速培育液流电池储能产业。做强压缩空气储能产业。培育壮大氢储运装备产业。协调推进电源侧储能发展。推动新型储能多场景优化布局。支持配套新能源项目的新型储能电站以独立储能形式直接接入公共电网，支持1个企业集团的多个储能电站，或多家企业的储能电站合并集中建设。鼓励在负荷密集区、新能源富集区等电网关键节点有序布局新型储能项目。按照因地制宜、灵活多样的原则支持在工业园区、产业园区、城市小区、数据中心、大型公共服务区等地区发展用户侧储能。支持依托新型储能开展多能互补、源网荷储一体化等发展模式，鼓励探索新型储能与智慧城市、智慧交通、乡村振兴等领域的跨界融合。健全新型储能市场化机制。明确新型储能独立市场主体地位。研究制定新型储能未参与电力市场交易之前的充放电价格标准。加快构建电力中长期市场、现货市场有机衔接的市场交易体系，研究明确新型储能参与中长期、现货等电力市场的准入条件、交易和结算机制，落实新型储能辅助服务补偿机制，推动新型储能尽早纳入各类电力市场。研究优化分时电价政策，为用户侧储能发展创造更大空间。
            </View>
            <View
                style={Func.getStyles({
                    color: token.colorPrimary,
                    "margin-bottom": '30px',
                    "text-align": 'center',
                    "font-size": '32px',
                    "font-weight": 600
                })}
            >
                政策解读
            </View>
            <View
                style={Func.getStyles({
                    "margin-bottom": '60px',
                })}
            >
                到2025年，新型储能电站装机规模达到300万千瓦，全省新型储能产业营业收入达到4000亿元以上。完善延伸锂电产业链优势。加速培育液流电池储能产业。做强压缩空气储能产业。培育壮大氢储运装备产业。协调推进电源侧储能发展。推动新型储能多场景优化布局。支持配套新能源项目的新型储能电站以独立储能形式直接接入公共电网，支持1个企业集团的多个储能电站，或多家企业的储能电站合并集中建设。鼓励在负荷密集区、新能源富集区等电网关键节点有序布局新型储能项目。按照因地制宜、灵活多样的原则支持在工业园区、产业园区、城市小区、数据中心、大型公共服务区等地区发展用户侧储能。支持依托新型储能开展多能互补、源网荷储一体化等发展模式，鼓励探索新型储能与智慧城市、智慧交通、乡村振兴等领域的跨界融合。健全新型储能市场化机制。明确新型储能独立市场主体地位。研究制定新型储能未参与电力市场交易之前的充放电价格标准。加快构建电力中长期市场、现货市场有机衔接的市场交易体系，研究明确新型储能参与中长期、现货等电力市场的准入条件、交易和结算机制，落实新型储能辅助服务补偿机制，推动新型储能尽早纳入各类电力市场。研究优化分时电价政策，为用户侧储能发展创造更大空间。
            </View>
            <View
                onClick={() => {
                    Taro.navigateTo({
                        url: `/pages/outer/index?url=http://k.sina.com.cn/article_3942942182_eb0485e6001012rdp.html&title=政策原文`
                    })
                }}
                style={Func.getStyles({
                    "margin-bottom": '30px',
                    "font-size": '32px',
                })}
            >
                政策原文
            </View>
        </View>
    )
}

export default PolicyDetail;