<template>
  <div class="heatMap_group">
    <div ref="heatMap" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "heatMap",
  props: {
    norData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    geoCoordMap: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      myChart: null,
      interval: null,
    };
  },
  computed: {
    mapChartOpt() {
      return {
        title: {
          show: false,
        },
        tooltip: {
          trigger: "item",
        },
        amap: {
          zoom: 5,
          zooms: [3, 20],
          // mapStyle: 'amap://styles/darkblue', // 地图主题
          mapStyle: "amap://styles/e6d3dfe65e954495b5ac5643e8a070e8",
          center: [115, 35], // 中心点
          resizeEnable: true,
        },
        series: [
          {
            name: "做题量",
            type: "scatter",
            coordinateSystem: "amap",
            data: this.convertData(this.norData),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false,
            },
            itemStyle: {
              color: "#2a84e6",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          {
            name: "当前更新",
            type: "effectScatter",
            coordinateSystem: "amap",
            data: this.convertData(_.shuffle(this.norData).slice(0, 6)),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "yellow",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      };
    },
  },
  watch: {
    norData() {
      this.updateChart();
    },
    geoCoordMap() {
      this.updateChart();
    },
  },
  methods: {
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
    initEChart() {
      const heatMap = this.$refs.heatMap;
      if (heatMap) {
        this.myChart = this.$echarts.init(heatMap);
        this.myChart.setOption(this.mapChartOpt);
      }
    },
    updateChart() {
      this.myChart.setOption(this.mapChartOpt);
    },
  },
  created() {},
  mounted() {
    this.initEChart();
    this.interval = setInterval(() => {
      // 随机给点加上波纹动效
      this.mapChartOpt.series[1].data = this.convertData(
        _.shuffle(this.norData).slice(0, 6)
      );
    }, 5000);
  },
};
</script>

<style scoped lang="scss">
@import "./heatMap";
</style>