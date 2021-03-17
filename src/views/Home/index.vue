<template>
  <div class="page home" v-cloak>
    <a-carousel
      ref="slideEl"
      class="slide-block"
      :autoplay="true"
      :autoplaySpeed="7000"
      :speed="2000"
      :dots="false"
      :pauseOnHover="false"
      effect="fade"
    >
      <div class="slide-item">
        <NumberFlow></NumberFlow>
      </div>
      <div class="slide-item">
        <TempImage></TempImage>
      </div>
    </a-carousel>
  </div>
</template>

<script>
import NumberFlow from './components/NumberFlow';
import TempImage from './components/TempImage';

export default {
  name: 'Home',
  data() {
    return {
      slideInterval: null
    };
  },
  components: {
    NumberFlow,
    TempImage
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.slide-block {
  line-height: 1;
  width: 100%;
  height: 100%;
  /deep/ .slick-slider,
  /deep/ .slick-list,
  /deep/ .slick-track,
  /deep/ .slick-slide > div {
    height: 100%;
  }
  .slide-item {
    height: 100%;
    color: #fff;
  }
}
</style>
