<template>
  <div class="home_page">
    <div class="content_group">
      <div class="content_padding">
        <el-carousel :initial-index="0" :autoplay="true" @change="onSlideChange">
          <el-carousel-item>
            <el-row class="center_group">
              <el-col :span="24">
                <heatMap></heatMap>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <el-row class="center_group">
              <el-col :span="24">
                <ArcFlow></ArcFlow>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
        <div class="chart-title">{{chartTitle}}</div>
        <div class="right-data">
          <div class="subscribe-total">
            <IOdometer class="iOdometer" :value="rightData.subscribe" />
          </div>
          <div class="question-done">
            <IOdometer class="iOdometer" :value="rightData.questionDone" />
          </div>
          <div class="unique-visitor">
            <IOdometer class="iOdometer" :value="rightData.uniqueVisitor" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import heatMap from "../../components/heatMap/heatMap";
import ArcFlow from "../../components/ArcFlow/ArcFlow";
import IOdometer from "vue-odometer";
import "odometer/themes/odometer-theme-default.css";

export default {
  name: "home",
  data() {
    return {
      chartTitleArr: ["做题人数分布图", "物流轨迹图"],
      curSlideIndex: 0,
      rightData: {
        subscribe: 120500,
        questionDone: 120400,
        uniqueVisitor: 123123,
      },
    };
  },
  components: {
    heatMap,
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
  },
   created() {},
  mounted() {
    setInterval(() => {
      for (const key in this.rightData) {
        this.rightData[key]+=100
      }
    }, 5000);
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
