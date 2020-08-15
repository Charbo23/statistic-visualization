<template>
  <div class="home-page" v-cloak>
    <div class="page-content">
      <div class="left-date-block">
        <div class="date-top">{{dateData.week}}</div>
        <div class="date-middle">{{dateData.time}}</div>
        <div class="date-bottom">
          <div class="year-wing">
            <div class="wing-bar"></div>
            <div class="wing-bar"></div>
            <div class="wing-bar"></div>
          </div>
          <div class="date-year">{{dateData.year}}</div>
          <div class="year-wing">
            <div class="wing-bar"></div>
            <div class="wing-bar"></div>
            <div class="wing-bar"></div>
          </div>
        </div>
      </div>
      <div class="right-data-block">
        <div class="top-num">
          今日访问
          <span class="scroll-num-wrapper">
            <IOdometer class="iOdometer right-data-num" :value="rightData.uv" />
          </span>
          人
        </div>
        <table class="right-data-table">
          <tr class="right-data-item bottom-num">
            <td>
              <div class="left-title">今日做题量：</div>
            </td>
            <td>
              <vue-numeric separator="," :read-only="true" v-model="rightData.learnNums"></vue-numeric>&nbsp;题
            </td>
          </tr>
          <tr class="right-data-item bottom-num">
            <td>
              <div class="left-title">公众号关注总数：</div>
            </td>
            <td>
              <vue-numeric separator="," :read-only="true" v-model="rightData.totalNum"></vue-numeric>&nbsp;人
            </td>
          </tr>
          <tr class="right-data-item bottom-num">
            <td>
              <div class="left-title">今日新增关注：</div>
            </td>
            <td>
              <vue-numeric separator="," :read-only="true" v-model="rightData.todaySubscribes"></vue-numeric>&nbsp;人
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import _ from 'lodash';
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';
import VueNumeric from 'vue-numeric';
import { getUserVisualizedData } from '@/api/common';

export default {
  name: 'home',
  data() {
    return {
      rightData: {
        totalNum: 0,
        learnNums: 0,
        todaySubscribes: 0,
        uv: 0
      },
      dataInterval: null,
      dayjsObj: null,
      dateData: {
        year: '----',
        week: '',
        time: '--:--'
      },
      dateInterval: null
    };
  },
  components: {
    IOdometer,
    VueNumeric
  },
  computed: {},
  methods: {
    // 获取右侧数据
    getRightData() {
      this.stopDataInterval();
      return getUserVisualizedData({ type: 'common' })
        .then((ret) => {
          if (ret.code == 0) {
            this.rightData.totalNum = _.max([this.rightData.totalNum, parseInt(ret.data.total_num)]);
            this.rightData.todaySubscribes = _.max([
              this.rightData.todaySubscribes,
              parseInt(ret.data.today_subscribes)
            ]);
            this.rightData.learnNums = _.max([this.rightData.learnNums, parseInt(ret.data.learn_nums)]);
            this.rightData.uv = _.max([this.rightData.uv, parseInt(ret.data.uv)]);
          }
          this.startDataInterval();
        })
        .catch((e) => {
          console.log(e);
          this.startDataInterval();
        });
    },
    // 开启数据轮询
    startDataInterval() {
      if (!this.dataInterval) {
        this.dataInterval = setInterval(() => {
          this.getRightData();
        }, 5000);
      }
    },
    // 停止数据轮询
    stopDataInterval() {
      if (this.dataInterval) {
        clearInterval(this.dataInterval);
        this.dataInterval = null;
      }
    },
    // 更新时间
    updateTime(){
      const dayjsObj = dayjs();
      this.dateData = {
        year: dayjsObj.year(),
        week: dayjsObj.format('dddd'),
        time: dayjsObj.format('HH:mm')
      };
    }
  },
  async created() {
    this.updateTime()
    this.dateInterval = setInterval(() => {
     this.updateTime()
    }, 1000);
    this.getRightData();
  },
  async mounted() {}
};
</script>

<style scoped lang="scss">
@import './home.scss';
</style>
