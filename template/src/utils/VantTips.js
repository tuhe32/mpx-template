/**
 * 提示与加载工具类 基于Vant 组件
 * 受限于vant 组件 ，
 * 因此使用时，需要保证两点：
 * 1、页面template中必须有 <van-toast id="van-toast" />
 * 2、页面必须引入组件 "van-toast": "vant-weapp/dist/toast/index"
 * 满足以上两个条件才可以使用该功能
 * vant提供的 Toast没有字数限制，更可控
 * 注意： Dialog等组件也是同样处理！！！
 */
import Toast from 'vant-weapp/dist/toast/toast'
import Dialog from 'vant-weapp/dist/dialog/dialog';

export default class Tips {
  static success (title,duration = 1200) {
    Toast.success({
      message:title,
      duration: duration
    });
  }

  static loading () {
    Toast.loading({
      mask: true,
      message: '加载中...'
    });
  }

  static fail (title,duration = 1200) {
    Toast.fail({
      message:title,
      duration: duration
    });
  }

  static alert (text, title = '提示') {
    Dialog.alert({
      title: title,
      message: text
    }).then(() => {
      // on close
    });
  }

  static confirm (text, title = '提示') {
    return new Promise((resolve, reject) => {
      Dialog.confirm({
        title: title,
        message: text
      }).then(() => {
         // on confirm
        resolve()
      }).catch(() => {
        // on cancel
        reject();
      });
    })
  }


}