import Vue from 'vue';
import echarts from 'echarts';
import 'echarts-amap';
import { DatePicker, Row, Col, Progress, Message, MessageBox, Loading, Carousel, CarouselItem } from 'element-ui';

Vue.prototype.$echarts = echarts;

Vue.use(DatePicker)
  .use(Row)
  .use(Col)
  .use(Progress)
  .use(Loading)
  .use(Carousel)
  .use(CarouselItem);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;
Vue.prototype.$loading = Loading;
