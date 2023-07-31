import { getUserInfo } from "@/services/user";

export default {
    namespace: 'user',
    state: {
      userInfo: {
        name: 'wq1997'
      }
    },
    effects:{
        *getUserInfo(payload,{put,call}){
            const res = yield call(getUserInfo, {
                id: '111111'
            })
            yield put({
                type: 'updateState',
                payload: {
                    userInfo: {
                        name: "wq1998"
                    }
                }
            })
        }
    },
    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },
    subscriptions:{
      setup({history,dispatch}){

      }
    }
}  