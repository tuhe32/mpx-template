import mpx from '@mpxjs/core'
import mpxFetch from '@mpxjs/fetch'
import {wxRedirect, wxGetStorageSync} from './WxApiUtils'
import Tips from './Tips'
import store from '../store/index'

mpx.use(mpxFetch)

// console.log('[process.env.BASE_API]',process.env.BASE_API);
const service = mpx.xfetch;

service.interceptors.request.use(config => {
  console.log('[config]',config)
  // 让每个请求携带token
  if (store.getters.token) config.header = wxGetStorageSync('token') //设置token
  config.url = process.env.BASE_API + config.url  //加载基础路径
  if (!config.method) config.method = 'POST'      // 默认请求方式为POST 方式
  // 也可以返回promise
  return config
},error => {
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const wxCode = response.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return Promise.reject('error')
    } else {
      const resp = response.data;
      console.log('[resp]',resp);
      // 判断返回结果
      if(resp.code == -1 ) {
        console.log("isNeedLogin,需要登录")
        wxRedirect( "/pages/login");
        return true;
      } else if(resp.code == 1 ) {
        console.log('[接口失败]',resp.msg);
        Tips.error(resp.msg);
        // return Promise.reject(resp.msg)
      }
      return resp;
    }
},error => {
  console.log('[response error]',error);
  return Promise.reject(error)
})

export default service;