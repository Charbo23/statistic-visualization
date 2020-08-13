<template>
  <div class="map-page" v-cloak>
    <div class="content_group">
      <div class="content_padding">
        <el-carousel ref="slideEl" :initial-index="0" :autoplay="false" @change="onSlideChange">
          <el-carousel-item>
            <el-row class="center_group">
              <el-col :span="24">
                <HeatMap
                  :norData="norData"
                  :highlightNorData="highlightNorData"
                  :geoCoordMap="geoCoordMap"
                ></HeatMap>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <el-row class="center_group">
              <el-col :span="24">
                <ArcFlow :arcData="curArcData"></ArcFlow>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <div class="chart-title">{{chartTitle}}</div>
        <div class="right-data">
          <div class="top-num">
            <IOdometer class="iOdometer right-data-num" :value="rightData.uv" />
            <div class="sub-title">今日UV数</div>
          </div>
          <table class="right-data-table">
            <tr class="right-data-item bottom-num">
              <td>
                <div class="left-title">公众号关注</div>
              </td>
              <td>
                <IOdometer class="iOdometer right-data-num" :value="rightData.totalNum" />
              </td>
            </tr>
            <tr class="right-data-item bottom-num">
              <td>
                <div class="left-title">今日做题人数</div>
              </td>
              <td>
                <IOdometer class="iOdometer right-data-num" :value="rightData.learnUsers" />
              </td>
            </tr>
            <tr class="right-data-item bottom-num">
              <td>
                <div class="left-title">今日做题总量</div>
              </td>
              <td>
                <IOdometer class="iOdometer right-data-num" :value="rightData.learnNums" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeatMap from '../../components/HeatMap/HeatMap';
import ArcFlow from '../../components/ArcFlow/ArcFlow';
import _ from 'lodash';
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';
import { getUserVisualizedData } from '@/api/common';

export default {
  name: 'vmap',
  data() {
    return {
      chartTitleArr: ['易哈佛当前在线考生人数分布图', '易哈佛物流在途轨迹图'],
      curSlideIndex: 0,
      rightData: {
        totalNum: 0,
        learnUsers: 0,
        learnNums: 0,
        uv: 0
      },
      norData: [],
      highlightNorData: [],
      geoCoordMap: {},
      arcData: [],
      curArcData: [],
      curArcIndex: 0,
      dataInterval: null,
      slideInterval: null
    };
  },
  components: {
    HeatMap,
    ArcFlow,
    IOdometer
  },
  computed: {
    chartTitle() {
      return this.chartTitleArr[this.curSlideIndex];
    }
  },
  methods: {
    // 停止轮播
    stopSlide() {
      this.slideInterval && clearInterval(this.slideInterval);
      this.slideInterval = null;
    },
    // 延迟开启轮播（防抖化）
    delayStartSlide: _.debounce(function () {
      !this.slideInterval &&
        (this.slideInterval = setInterval(() => {
          this.$refs.slideEl.next();
        }, 10000));
    }, 500),
    // 切换轮播事件
    onSlideChange(cur, prev) {
      this.curSlideIndex = cur;
    },
    // 获取右侧数据
    async getRightData() {
      const ret = await getUserVisualizedData({ type: 'common' });
      if (ret.code == 0) {
        this.rightData.totalNum = _.max([this.rightData.totalNum, parseInt(ret.data.total_num)]);
        this.rightData.learnUsers = _.max([this.rightData.learnUsers, parseInt(ret.data.learn_users)]);
        this.rightData.learnNums = _.max([this.rightData.learnNums, parseInt(ret.data.learn_nums)]);
        this.rightData.uv = _.max([this.rightData.uv, parseInt(ret.data.uv)]);
      }
    },
    // 获取地图数据
    async getMapData() {
      const retArr = await Promise.all([
        getUserVisualizedData({ type: 'city_user' }),
        getUserVisualizedData({ type: 'ship_order' })
      ]);
      if (retArr[0].code == 0) {
        const { city_ratio_list, city_lnglat_list } = retArr[0].data;
        this.norData = city_ratio_list;
        this.updateHighlightData();

        this.geoCoordMap = city_lnglat_list;
      }
      if (retArr[1].code == 0) {
        this.arcData = retArr[1].data;
      }
    },
    // 更新人数分布闪动
    updateHighlightData() {
      this.highlightNorData = _.shuffle(this.norData).slice(0, _.clamp(_.random(1, this.norData.length), 0, 10));
    }
  },
  created() {},
  async mounted() {
    await this.getRightData();
    await this.getMapData();
    this.arcData.some((item, index) => {
      // 寻找当前时间点的物流数据作为开始
      var curIndexTime = (item.time + '').padEnd(13, 0);
      if (curIndexTime < new Date().getTime()) {
        this.curArcIndex = index + 1;
        this.curArcData = this.curArcData.concat(item.data);
        return false;
      } else {
        return true;
      }
    });
    this.dataInterval = setInterval(() => {
      this.getRightData();
      // 更新物流轨迹
      if (this.curArcIndex < this.arcData.length) {
        let curIndexTime = parseInt((this.arcData[this.curArcIndex].time + '').padEnd(13, 0));
        if (curIndexTime < new Date().getTime()) {
          this.curArcData = this.curArcData.concat(this.arcData[this.curArcIndex].data);
          this.curArcIndex++;
        }
      }
      this.updateHighlightData();
    }, 5000);
    this.slideInterval = setInterval(() => {
      this.$refs.slideEl.next();
    }, 10000);
    // 监听鼠标移动事件，移动时不自动切换
    window.addEventListener('mousemove', () => {
      this.stopSlide();
      this.delayStartSlide();
    });
  }
};
</script>

<style scoped lang="scss">
@import './vmap.scss'
</style>
