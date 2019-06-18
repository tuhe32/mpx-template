import {wxRedirect, WxSetStorageSync, wxLogin, wxGetUserInfo, wxClearStorageSync} from '../utils/WxApiUtils';
import {apiMiniAppLogin,apiGetUserInfo} from '../api/login'

export default class auth {
  
  static async login () {
    try {
      await this.doLogin();
      return await this.getUserInfo();
    } catch (error) {
      console.error('[auth] 授权失败', error);
      wxRedirect('/pages/login');
    }
  }

  /**
   * 点击登录后去后台拿到token 返回
   */
  static async doLogin() {
    let code = await wxLogin();
    console.log('code',code)
    let token = await apiMiniAppLogin(code);
    console.log('[获得token结果]',token)
    WxSetStorageSync('token',token);
  }

  /**
   * 获取用户信息
   */
  static async getUserInfo() {
    let rawUser = await wxGetUserInfo();
    console.log('[用户信息]',rawUser)
    let weixinUser = await this.decodeUserInfo(rawUser);
    console.log('保存后的用户',weixinUser)
    if(!weixinUser) return false;
    await WxSetStorageSync('user', weixinUser);
    return true;
  }

  /**
   * 服务端解密用户信息
   */
  static async decodeUserInfo(rawUser) {
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

  /**
   * 退出登录
   */
  static doLogout() {
    wxClearStorageSync()
  }
}