import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/http'
import './styles/style.scss'
import './styles/project.scss'
import {DatePicker, Row, Col, Progress, Message, MessageBox, Loading, Carousel, CarouselItem} from 'element-ui';
import './utils/flexible'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
// import 'echarts/extension/bmap/bmap'
import 'echarts-amap'

Vue.prototype.$echarts = echarts

Vue.use(DatePicker)
  .use(Row)
  .use(Col)
  .use(Progress)
  .use(Loading)
  .use(Carousel)
  .use(CarouselItem)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;
Vue.prototype.$loading = Loading;



Vue.config.productionTip = false

let userAgent = navigator.userAgent;
Vue.prototype.$isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; //android终端
Vue.prototype.$isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

//软键盘关闭事件
if(userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  document.body.addEventListener('focusout', () => {
    setTimeout(() => {
      window.scroll(0, 0)
    })
  });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
