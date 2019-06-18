import { wxRedirect, WxSetStorageSync, wxLogin, wxGetUserInfo, wxClearStorageSync, wxGetStorageSync } from "../../utils/WxApiUtils";
import {apiMiniAppLogin,apiGetUserInfo} from '../../api/login'

/**
 * 服务端解密用户信息
 */
async function decodeUserInfo(rawUser) {
  const param = {
    rawData: rawUser.rawData,
    signature: rawUser.signature,
    encryptedData: rawUser.encryptedData,
    iv: rawUser.iv
  };
  console.log("解密param",param);
  let resp = await apiGetUserInfo(param);
  if(resp) return resp.weixinUser;
  else return null;
}

const user = {
  state: { 
    user: '',
    status: '',
    code: '',
    token: wxGetStorageSync('token'),
    name: '',
    avatar: '',
  },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    },
    async Login ({ dispatch }) {
      try {
        await dispatch("doLogin");
        return await dispatch("getUserInfo");
      } catch (error) {
        console.error('[auth] 授权失败', error);
        wxRedirect('/pages/login');
      }
    },
    /**
     * 点击登录后去后台拿到token 返回
     */
    async doLogin ({ commit }) {
      let code = await wxLogin();
      console.log('code',code)
      let token = await apiMiniAppLogin(code);
      console.log('[获得token结果]',token)
      WxSetStorageSync('token',token);
      commit("SET_TOKEN",token)
    },
    /**
     * 获取用户信息
     */
    async getUserInfo ({ commit }) {
      let rawUser = await wxGetUserInfo();
      console.log('[用户信息]',rawUser)
      let weixinUser = await decodeUserInfo(rawUser);
      console.log('保存后的用户',weixinUser)
      if(!weixinUser) return false;
      await WxSetStorageSync('user', weixinUser);
      // commit("SET_USER",weixinUser);
      commit("SET_NAME",weixinUser.username);
      commit("SET_AVATAR",weixinUser.avatar);
      return true;
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        wxClearStorageSync()
        resolve()
      })
    },
  }
}

export default user;
