<template>
  <div id="txMap"></div>
</template>

<script>
export default {
  name: 'ArcFlow',
  props: {
    arcData: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      map: null,
      arcMap: null
    };
  },
  watch: {
    arcData(cur) {
      this.arcMap && this.arcMap.setData(cur);
    }
  },
  methods: {
    initMap() {
      let data = this.arcData;
      //初始化地图
      this.map = new TMap.Map('txMap', {
        zoom: 4.5, //设置地图缩放级别
        pitch: 30,
        center: new TMap.LatLng(38, 115), //设置地图中心点坐标
        mapStyleId: 'style1' //个性化样式
      });
      //初始化弧线图并添加至map图层
      this.arcMap = new TMap.visualization.Arc({
        mode: 'vertical' // 弧线平面与地平面垂直
      })
        .addTo(this.map)
        .setData(data); //设置数据
    }
  },
  mounted() {
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }
};
</script>

<style scoped lang="scss">
#txMap {
  height: 100%;
}
</style>