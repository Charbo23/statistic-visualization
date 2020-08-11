<template>
  <div class="home_page" v-cloak>
    <div class="content_group">
      <div class="content_padding">
        <el-carousel ref="slideEl" :initial-index="0" :autoplay="false"  @change="onSlideChange">
          <el-carousel-item>
            <el-row class="center_group">
              <el-col :span="24">
                <HeatMap :norData="norData" :geoCoordMap="geoCoordMap"></HeatMap>
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
          <div class="subscribe-total">
            <IOdometer class="iOdometer right-data-num" :value="rightData.subscribe" />
            <div class="sub-title">公众号总关注量</div>
          </div>
          <table class="right-data-table">
            <tr class="right-data-item question-done">
              <td>
                <div class="left-title">今日做题人数</div>
              </td>
              <td>
                <IOdometer class="iOdometer right-data-num" :value="rightData.questionDone" />
              </td>
            </tr>
            <tr class="right-data-item unique-visitor">
              <td>
                <div class="left-title">今日UV数</div>
              </td>
              <td>
                <IOdometer class="iOdometer right-data-num" :value="rightData.uniqueVisitor" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeatMap from "../../components/HeatMap/HeatMap";
import ArcFlow from "../../components/ArcFlow/ArcFlow";
import _ from "lodash";
import IOdometer from "vue-odometer";
import "odometer/themes/odometer-theme-default.css";
import { getUserVisualizedData } from "@/api/home";

export default {
  name: "home",
  data() {
    return {
      chartTitleArr: ["做题人数分布图", "物流轨迹图"],
      curSlideIndex: 0,
      rightData: {
        subscribe: 0,
        questionDone: 0,
        uniqueVisitor: 0,
      },
      norData:[],
      geoCoordMap:{},
      arcData:[],
      curArcData: [],
      curArcIndex: 0,
    };
  },
  components: {
    HeatMap,
    ArcFlow,
    IOdometer,
  },
  computed: {
    chartTitle() {
      return this.chartTitleArr[this.curSlideIndex];
    },
  },
  methods: {
    onSlideChange(cur, prev) {
      this.curSlideIndex = cur;
    },
    async getRightData() {
      const ret = await getUserVisualizedData({type:'common'});
      console.log(ret);
      this.rightData.subscribe =
        parseInt(ret.data.total_num) > this.rightData.subscribe
          ? parseInt(ret.data.total_num)
          : this.rightData.subscribe;
      this.rightData.questionDone =
        ret.data.learn_users > this.rightData.questionDone
          ? ret.data.learn_users
          : this.rightData.questionDone;
      this.rightData.uniqueVisitor =
        ret.data.uv > this.rightData.uniqueVisitor
          ? ret.data.uv
          : this.rightData.uniqueVisitor;
    },
    async getMapData() {
      const { city_ratio_list, city_lnglat_list } = (await getUserVisualizedData({type:'city_user'})).data;
      this.norData = city_ratio_list;
      this.geoCoordMap = city_lnglat_list;
      this.arcData =( await getUserVisualizedData({type:'ship_order'})).data;
    },
  },
  created() {},
  async mounted() {
    await this.getRightData();
    await this.getMapData();
    // this.arcData.some((item, index) => {
    //   // 寻找当前时间点的物流数据作为开始
    //   var curIndexTime= (item.time + "").padEnd(13, 0);
    //   if (  curIndexTime< new Date().getTime()) {
    //     this.curArcIndex = index;
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
    this.curArcData = this.arcData[this.curArcIndex].data;
    setInterval(() => {
      this.getRightData();
      this.curArcIndex = _.clamp(
        this.curArcIndex + 1,
        0,
        this.arcData.length - 1
      );
      let curIndexTime = parseInt(
        (this.arcData[this.curArcIndex].time + "").padEnd(13, 0)
      );
      if (curIndexTime < new Date().getTime()) {
        this.curArcData = this.arcData[this.curArcIndex].data;
      }
      // this.$refs.slideEl.next()
    }, 10000);
  },
};
</script>

<style scoped lang="scss">
@import "./home";
::v-deep .dataPickMy {
  background: transparent;
  border: unset;
  width: unset;
  i {
    color: #b5f0ec !important;
  }
  input {
    background: transparent;
    color: #b5f0ec !important;
    font-size: 20px;
    font-weight: 500;
    width: 180px;
  }
  .el-range-separator {
    width: unset;
    padding: 0;
    font-size: 30px;
    color: #b5f0ec !important;
    margin-top: -4px;
  }
}
</style>
