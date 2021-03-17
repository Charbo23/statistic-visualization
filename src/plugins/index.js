import Vue from 'vue';
import { DatePicker, Row, Col, Progress, Message, Carousel } from 'ant-design-vue';

Vue.use(DatePicker)
  .use(Row)
  .use(Col)
  .use(Progress)
  .use(Carousel);
Vue.prototype.$message = Message;
