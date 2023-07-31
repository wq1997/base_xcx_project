import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import {connect} from "react-redux";
import { AtButton } from 'taro-ui';
import './index.scss';

const Home = (props)=>{
  const { dispatch } = props;
  const goToLogin = () => {
    // Taro.redirectTo({
    //   url: '/pages/login/index?name=wq'
    // })
    dispatch({
      type: 'user/getUserInfo',
    })
  }
  return (
      <View className="index">
          <View>{props.user.userInfo.name}</View>
          <AtButton onClick={goToLogin} type="primary">跳转</AtButton>
      </View>
  );
}
export default connect(({
  user
})=>({ 
  user
}))(Home);