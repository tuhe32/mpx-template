import mpx from '@mpxjs/core'
import apiProxy from '@mpxjs/api-proxy'

mpx.use(apiProxy, {
  usePromise: true,
  whiteList: [] // showToast 将不能使用 promise 形式
})

// Tabbat 路径 每个项目都需要更改一下才能正确使用
const tabUrls = ['/pages/index', '/pages/reportForm', '/pages/user/index'];

function isTab (url) {
  return tabUrls.some(path => path == url);
}
export function wxSwitchTab (url) {
  mpx.switchTab({
    url: url
  })
}
/**
 * redirect 是重定向,没有返回按钮
 * 注意 需要配置tabbar 页面url
 */
export function wxRedirect (url) {
  if (isTab(url)) {
    mpx.switchTab({
      url: url
    })
  }else {
    const pages = getCurrentPages();
    // route在低版本不兼容
    const index = pages.findIndex(item => ('/' + item.__route__) == url);
    if (pages.length < 2 || index < 0) {
      mpx.redirectTo({
        url: url
      });
    } else {
      const delta = pages.length - 1 - index;
      mpx.navigateBack({
        delta: delta
      });
    }
  }
}
/**
 * navigate 是返回到上一页，有返回按钮出现
 * 注意 需要配置tabbar 页面url
 */
export function wxNavigate (url) {
  if (isTab(url)) {
    mpx.switchTab({
      url: url
    })
  }else {
    const pages = getCurrentPages();
    const index = pages.findIndex(item => ('/' + item.__route__) == url);// route在低版本不兼容
    if (pages.length < 2 || index < 0) {
      mpx.navigateTo({
        url: url
      });
    } else {
      const delta = pages.length - 1 - index;
      mpx.navigateBack({
        delta: delta
      });
    }
  }
}

export function wxPay(param) {
  return mpx.requestPayment({...param}).then(res => {
    if (res.errMsg == 'requestPayment:ok') {
      return res;
    }
  });
  // return new Promise((resolve, reject) => {
  //   wx.requestPayment({
  //     ...param,
  //     complete: res => {
  //       if (res.errMsg == 'requestPayment:ok') {
  //         resolve(res);
  //       } else {
  //         reject(res);
  //       }
  //     }
  //   });
  // });
}
/**
 * 获取地理位置
 */
export function wxGetLocation() {
  // let param = {}
  return mpx.getLocation({
    type: 'wgs84'
  }).then(res => {
    return res;
  }).catch(err => {
    return err;
  })
  // return new Promise((resolve, reject) => {
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function(res) {
  //       resolve(res)
  //       // param.latitude = res.latitude
  //       // param.longitude = res.longitude
  //       // param.speed = res.speed
  //       // param.accuracy = res.accuracy
  //     },
  //     fail:function(res) {
  //       resolve(res)
  //     }
  //   })
  // });
}
/**
 * 兼容性判断
 */
export function wxCanIUse(str) {
  if (mpx.canIUse) {
    return mpx.canIUse(str);
  } else {
    return false;
  }
}
/**
 * 检查SDK版本
 */
export function wxIsSDKExipred() {
  const {SDKVersion} = mpx.getSystemInfoSync();
  console.info(`[version]sdk ${SDKVersion}`);
  return SDKVersion == null || SDKVersion < '2.2.0'
}
/**
 * 检查SDK版本
 */
export function wxCheckSDK() {
  if (this.isSDKExipred()) {
    // Tips.modal('您的微信版本太低，为确保正常使用，请尽快升级');
  }
}

export function WxSetStorageSync(key, value) {
  try {
    mpx.setStorageSync(key, value)
  } catch (e) { 
    console.log('[setStorageSync]',e);
  }
}

export function wxGetStorageSync(key) {
  try {
    var value = mpx.getStorageSync(key)
    if (value) {
      // Do something with return value
      return value;
    }
  } catch (e) {
    // Do something when catch error
    console.log('[getStorageSync]',e);
  }
}

export function wxRemoveStorageSync(key) {
  try {
    mpx.removeStorageSync(key)
  } catch (e) {
    // Do something when catch error
    console.log('[removeStorageSync]',e);
  }
}

export function wxClearStorageSync() {
  try {
    mpx.clearStorageSync()
  } catch(e) {
    // Do something when catch error
  }
}

export function wxGetUserInfo() {
  return new Promise((resolve,reject) => {
    mpx.getUserInfo({
      success: res => {
        resolve(res.userInfo);
        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
      },
      fail: error => {
        reject(error);
      }
    })
  })
}

export function wxLogin () {
  return new Promise((resolve,reject) => {
    mpx.login({
      success (res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject()
        }
      },
      fail (error) {
        reject(error)
      }
    })
  })
}
