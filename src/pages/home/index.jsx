import { View } from '@tarojs/components';
import {connect} from "react-redux";
import { AtButton } from 'taro-ui';
import Func from "@/utils/Func";
import { Echarts } from "@/components"
import './index.scss';

const Home = (props)=>{
  const { dispatch, token, user } = props;
  const goToLogin = () => {
    dispatch({
      type: 'user/getUserInfo',
    })
  }
  return (
      <View
        style={Func.getStyles({
          width: '100vw',
          height: '100vh',
          background: token.backgroundColor,
          color: token.color
        })}
      >
          <View>
            {user.userInfo.name}
          </View>
          <Echarts 
            style={{
              width: '100%',
              height: '300px'
            }}
            option={{
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: [120, 200, 150, 80, 70, 110, 130],
                  type: 'bar'
                }
              ]
            }}
          />
          <AtButton onClick={goToLogin} type="primary">跳转</AtButton>
      </View>
  );
}
export default connect(({
  user
})=>({ 
  user
}))(Home);