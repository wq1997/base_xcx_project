import { View, Image } from '@tarojs/components';
import { connect } from "react-redux";
import Func from "@/utils/Func";
import { PUBLIC_FILE_PATH } from "@/utils/constants";
import Taro from "@tarojs/taro";

const homeList = [
  {
    icon: 'electricityPrice.svg',
    href: '/pages/electricityPrice/index',
    title: '电价'
  },
  {
    icon: 'policy.svg',
    href: '/pages/policy/index',
    title: '市场政策'
  },
  {
    icon: 'investment.svg',
    href: '/pages/investment/index',
    title: '投资测算'
  }
]

const Home = (props) => {
  const { token } = props;
  console.log(token)
  return (
    <View
      style={Func.getStyles({
        height: 'calc(100vh - 48px)',
        background: token.backgroundColor,
        color: token.color,
        padding: '24px',
        position: 'relative'
      })}
    >
      <View style={Func.getStyles({
        width: '100%',
        height: '500px',
        position: 'absolute',
        background: token.colorPrimary,
        top: 0,
        left: 0
      })}>
        <View style={Func.getStyles({
          width: '100%',
          height: '300px',
          position: 'absolute',
          background: token.colorPrimary,
          bottom: '-140px',
          left: 0,
          'border-radius': '50%'
        })}>

        </View>
      </View>
      <View
        style={Func.getStyles({
          display: 'grid',
          "grid-template-columns": 'repeat(2, 1fr)',
          "text-align": "center",
          gap: '20px',
          width: 'calc(100% - 48px)',
          position: 'absolute',
          top: '24px',
        })}
      >
        {homeList.map(home => {
          return (
            <View
              style={Func.getStyles({
                border: `1px solid ${token.colorBorder}`,
                padding: '60px 40px',
                'border-radius': '20px',
                backgroundColor: '#DBDEFD'
              })}
              onTap={() => {
                Taro.navigateTo({
                  url: home.href
                })
              }}
            >
              <View style={Func.getStyles({
                "margin-bottom": "20px",
              })}>
                <Image
                  src={`${PUBLIC_FILE_PATH}${home.icon}`}
                  style={Func.getStyles({
                    width: '120px',
                    height: '120px'
                  })}
                />
              </View>
              <View style={Func.getStyles({
                'font-size': '30px',
                'font-weight': 'bold'
              })}>{home.title}</View>
            </View>
          )
        })}
      </View>
    </View>
  );
}
export default connect(({
  user
}) => ({
  user
}))(Home);