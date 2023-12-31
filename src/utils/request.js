import Taro from '@tarojs/taro';
import { getToken } from "./authTools";

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

export const getBaseUrl = () => {
  let API_BASE_URL = '';
  if (process.env.NODE_ENV == 'production') {
    API_BASE_URL = 'http://192.168.0.108:1888';
  } else {
    API_BASE_URL = 'http://192.168.0.108:1888';
  }
  return API_BASE_URL;
};

/**
 * http request 请求
 * @param {http method} method
 * @param {*} requestHandler
 */
export async function request(url, option) {
  const options = {
    ...option
  };
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };

  newOptions.headers = {
    ...newOptions.headers,
    // 客户端认证
    Authorization: `Basic bGVnYWw6bGVnYWxfc2VjcmV0`,
    'Content-Type': option?.contentType||'application/json;charset=utf-8'
  };

  //token鉴权
  const token = ()=>getToken()

  if (token) {
    newOptions.headers = {
      ...newOptions.headers,
      'Token': token
    };
  }

  const checkStatus = (response) => {
    if (response.code >= 200 && response.code < 300) {
      return;
    }
    const infotext = codeMessage[response.code] || response.code;
    const msgInfo = { [response.code.toString()]: infotext };
    // 错误通知
    // const error = new Error(infotext);
    // error.name = response.code.toString();
    // throw error;
    console.log('CHECKSTATUS：', JSON.stringify(msgInfo));
  };

  const checkCode = (response) => {
    if (response.code && response.code === 401) {
      console.log('CHECKCODE：', codeMessage[401]);
    }
  };

  const success = function (res, resolve, reject) {
    if (res.data.success) {
      resolve(res.data);
    } else {
      reject('网络请求错误');
    }
  };

  const fail = function (res, reject) {
    reject('网络请求错误');
  };

  //print info
  const complete = function (res) {
    if(res?.data?.code){
      checkStatus(res.data);
      checkCode(res.data);
    }else{
      reject('网络请求错误');
    }
  };

  Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

  return new Promise((resolve, reject) => {
    Taro.request({
      url: getBaseUrl() + url,
      data: newOptions.body ,
      method: newOptions.method || 'GET',
      responseType: 'text',
      credentials: newOptions.credentials,
      header: newOptions.headers,
      mode: 'no-cors',
      success: (res) => success(res, resolve, reject),
      fail: (res) => fail(res, reject),
      complete
    });
  });
}
