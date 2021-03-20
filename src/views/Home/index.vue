<template>
  <div class="page home" v-cloak>
    <img class="ehafo-icon" src="~@/assets/images/ehafo-icon.png" />
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
        autoplay: 10000,
        speed: 2000,
        effect: 'fade'
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    NumberFlow,
    TempImage
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.ehafo-icon {
  position: absolute;
  width: 52px;
  height: 50px;
  right: 2.4%;
  top: 2.8%;
  z-index: 10;
  border-radius: 1px;
}
.slide-block {
  width: 100%;
  height: 100%;
  .slide-item {
    height: 100%;
    color: #fff;
  }
}
</style>
