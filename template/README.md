## 注意事项

### 1、class绑定：wx:class="{\{['login_logo',{animate :isActive},{shake: isActive}]}\}" 
- 多个判断class,和一个固定class 的写法，其他情况都可从中衍生

### 2、animate.css https://github.com/daneden/animate.css
- 自定义动画时长，延时，循环播放动画 .yourElement {
  animation-duration: 3s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
}
- "<h1 class="animated infinite bounce delay-2s">Example</h1>  "

### 3、导入项目的时候可以选择项目文件夹，然后在项目配置中 配置："miniprogramRoot": "dist/", 但是真机调试以及上传时需要将dist文件里的projec.config.json 中的"miniprogramRoot": "dist/"删除，不然上传不了！！！ 官方答复：
-（1）将wepach.wx.conf.js 中的copy-plugin注释掉；
-（2）推荐，直接打开dist文件夹

### 4、自定义tabbar ,每个tabbar页面都需要在show中处理selected选中状态
- （1）、第一步，需要在app.mpx中tabbar的设置里增加"custom": true, 开启自定义tabbar ,关闭则反之
- （2）、custom-tab-bar 文件夹下建立index.mpx
- （3）、每个tabbar页面的show中处理selected选中状态

### 5、组件的使用
- （1）、组件的注册以及使用和原生一样
- （2）、组件的传参：父组件传参：todo="{\{tab1}\}" index="{\{index}\}" 
- （3）、子组件事件通信：bind:showDetail="showDetail"  ==> bind:事件名="调用的父组件方法" 
- （4）、子组件：this.triggerEvent('showDetail', {value: 'child component'}) 触发事件
- （5）、父组件调用子组件的方法，this.selectComponent('.sharePopup').makeShareCanvas(); 加个类选择器后，直接调用即可

### 6、json中不允许出现单引号'',注释，最后一个键值对不能有逗号（,） !!!

### 7、分包可以有多个，只要满足单个分包不超过2M，整个项目不超过8M的要求即可，可以每个模块一个分包。主包中包含tabbar页面以及登录页，其他的可以放到分包中
- (1)、分包后，由于跳转路径变成需要加分包的root的前缀，为了正确获得redirect或者navigate的路径，官方提供import setPath from '../packages/user/set.mpx?resolve'; 获取正确的路径（不是引入页面，不占空间，只是用于编译时生成一个正确的路径字符串）

### 8、sticky 外层要有一个将所有元素包括可滚动部分的包起来父标签