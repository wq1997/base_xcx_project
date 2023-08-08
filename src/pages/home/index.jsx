import { View } from '@tarojs/components';
import {connect} from "react-redux";
import { AtButton } from 'taro-ui';
import Func from "@/utils/Func";
import { Echarts, Table } from "@/components"
import Taro from "@tarojs/taro";
import { useDebounceEffect } from "ahooks";
import './index.scss';

const Home = (props)=>{
  const { dispatch, token, user } = props;
  const goToLogin = () => {
    // dispatch({
    //   type: 'user/getUserInfo',
    // })
    Taro.redirectTo({
      url: '/pages/login/index'
    })
  }

  useDebounceEffect(()=>{
    
  }, [])
  return (
      <View
        style={Func.getStyles({
          width: '100vw',
          height: '100vh',
          background: token.backgroundColor,
          color: token.color
        })}
      >
          <Table 
            columns={[
              {
                title: ["季节","动物"],
                type: "multiple",
                key: "multiple"
              },
              {
                title: "春",
                key: "spring"
              },
              {
                title: "夏",
                key: "summer"
              },
              {
                title: "秋",
                key: "autumn"
              },
              {
                title: "冬",
                key: "winter"
              }
            ]}
            dataSource={
              [
                {
                  multiple: 'A1',
                  spring: 'A2',
                  summer: 'A3',
                  autumn: 'A4',
                  winter: 'A5'
                },
                {
                  multiple: 'B1',
                  spring: 'B2',
                  summer: 'B3',
                  autumn: 'B4',
                  winter: 'B5'
                }
              ]
            }
          />
          <View>
            {user.userInfo.name}
          </View>
          <AtButton onClick={()=>{
            Taro.chooseMessageFile({
              count: 10,
              type: 'image',
              success: function (res) {
                console.log("AAAAAAAA",res)
                const tempFilePaths = res.tempFilePaths
              },
              fail: function (res) {
                console.log("BBBBBBBB",res)
              },
            })
          }}>AAAAA</AtButton>
          <Echarts 
            style={{
              width: '100%',
              height: '300px'
            }}
            option={{
              tooltip: {},
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