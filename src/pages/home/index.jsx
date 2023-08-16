import { View } from '@tarojs/components';
import {connect} from "react-redux";
import Func from "@/utils/Func";
import { Icon } from "@/components";
import Taro from "@tarojs/taro";

const homeList = [
  {
    icon: 'bengchefenleijiageguanli',
    href: '/pages/electricityPrice/index',
    title: '电价'
  },
  {
    icon: 'zhengcexinxi',
    href: '/pages/policy/index',
    title: '市场政策'
  },
  {
    icon: 'touzi',
    href: '/pages/investment/index',
    title: '投资测算'
  }
]

const Home = (props)=>{
  const { token } = props;
  return (
      <View
        style={Func.getStyles({
          height: 'calc(100vh - 48px)',
          background: token.backgroundColor,
          color: token.color,
          padding: '24px'
        })}
      >
        <View
          style={Func.getStyles({
            display: 'grid',
            "grid-template-columns": 'repeat(2, 1fr)',
            "text-align": "center",
            gap: '20px'
          })}
        >
          {homeList.map(home => {
            return (
              <View
                style={Func.getStyles({
                  border: `1px solid ${token.colorBorder}`,
                  padding: '40px',
                  'border-radius': '8px'
                })}
                onTap={()=>{
                  Taro.navigateTo({
                    url: home.href
                  })
                }}
              >
                <View style={Func.getStyles({
                  "margin-bottom": "20px",
                })}>
                  <Icon type={home.icon} size={35} color={token.colorPrimary} />
                </View>
                <View>{home.title}</View>
              </View>
            )
          })}
        </View>
      </View>
  );
}
export default connect(({
  user
})=>({ 
  user
}))(Home);