import request from '../utils/Request'

export function apiMiniAppLogin(params) {
  request.fetch({
    url: 'wechat/user/login',
    method: 'GET',
    data: {
        code: params
    }
  });
}

export function apiGetUserInfo(params) {
  request.fetch({
    url: 'wechat/user/info',
    data: params
  });
}