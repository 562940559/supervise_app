/**
 * 解决hbuilder打包app之后点击手机返回键直接退出app的
 */
import { Toast, Dialog } from 'vant';
document.addEventListener('plusready', function () {
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      let isIndex = localStorage.getItem('isIndex');
      let isAddMission = localStorage.getItem('isAddMission');
      let iaAnswerQuestion = localStorage.getItem('iaAnswerQuestion');
      if (e.canBack && isIndex == 'false' && iaAnswerQuestion == 'false') {
        if (isAddMission == 'true') {
          // 如果是在首页 就拦截回退按钮
          return
        }
        webview.back();
      } else if (e.canBack && isIndex == 'false' && iaAnswerQuestion == 'true') {
        // 如果是在答题页面 就拦截 弹窗提示
        Dialog.confirm({
          title: "提示",
          message: "确认退出答题吗？",
        })
          .then(() => {
            return webview.back();
          })
          .catch(() => {
            return
          });
      } else {
        // 首页返回键处理
        // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
        var first = null
        plus.key.addEventListener(
          'backbutton',
          function () {
            // 首次按键，提示‘再按一次退出应用’
            if (!first) {
              first = new Date().getTime()
              Toast('再按一次退出应用') // 此处可以用自定义提示
              setTimeout(function () {
                first = null
              }, 1000)
            } else {
              if (new Date().getTime() - first < 1500) {
                plus.runtime.quit()
              }
            }
          },
          false
        )
      }
    })
  })
})