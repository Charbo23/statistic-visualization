import Vue from 'vue';
import { DatePicker, Row, Col, Progress, Message, Carousel,CarouselItem } from  'element-ui';

Vue.use(DatePicker)
  .use(Row)
  .use(Col)
  .use(Progress)
  .use(Carousel)
  .use(CarouselItem);
Vue.prototype.$message = Message;