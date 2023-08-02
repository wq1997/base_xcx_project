
export default {
    namespace: 'app',
    state: {
      theme: 'default'
    },
    effects:{
        *changeTheme({ payload },{put,call}){
          yield put({
            type: 'updateState',
            payload: {
              theme: payload.theme
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