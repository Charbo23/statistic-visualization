<template>
  <div class="page home" v-cloak>
    <swiper ref="slideEl" class="slide-block" :options="swiperOption">
      <swiper-slide class="slide-item">
        <NumberFlow></NumberFlow>
      </swiper-slide>
      <swiper-slide class="slide-item">
        <TempImage></TempImage>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import NumberFlow from './components/NumberFlow';
import TempImage from './components/TempImage';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  name: 'Home',
  data() {
    return {
      swiperOption: {
        autoplay: 6000,
        speed: 2000,
        effect: 'fade'
      }
    };
  },
  components: {
   swiper, swiperSlide ,
    NumberFlow,
    TempImage
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.slide-block {
  width: 100%;
  height: 100%;
  .slide-item {
    height: 100%;
    color: #fff;
  }
}
</style>
