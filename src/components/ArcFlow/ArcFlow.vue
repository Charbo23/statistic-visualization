<template>
  <div id="txMap"></div>
</template>

<script>
import _ from 'lodash'
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
      activeArcMap: null,//带动效的弧线图
      staticArcMap:null//静态弧线图
    };
  },
  watch: {
    arcData(cur,prev) {
      this.staticArcMap && this.staticArcMap.setData(prev);
      this.activeArcMap&& this.activeArcMap.setData(_.difference(cur,prev));
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
          this.staticArcMap = new TMap.visualization.Arc({
        animatable: false,
        mode: 'vertical' // 弧线平面与地平面垂直
      }).addTo(this.map)
      .setData(data); //设置数据
      this.activeArcMap = new TMap.visualization.Arc({
        mode: 'vertical' // 弧线平面与地平面垂直
      })
        .addTo(this.map)
     
  
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