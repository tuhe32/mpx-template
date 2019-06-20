import { wxGetStorageSync } from "./WxApiUtils";
export function createAuthHeaderFile () {
  // let token = wepy.$instance.globalData.token;
  // const header = {};
  // header['Content-Type'] = 'multipart/form-data'
  // if(token == null || token == undefined || token == '')
  let token = wxGetStorageSync("token")
  if (token) {
    header['token'] = token;
  }
  return header;
}