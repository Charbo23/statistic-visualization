import Vue from 'vue';
import echarts from 'echarts';
import 'echarts-amap';
import { DatePicker, Row, Col, Progress, Message, Carousel } from 'ant-design-vue';

Vue.prototype.$echarts = echarts;

Vue.use(DatePicker)
  .use(Row)
  .use(Col)
  .use(Progress)
  .use(Carousel);
Vue.prototype.$message = Message;
