<template>
  <div class="number-flow">
    <div class="page-content">
      <div class="left-date-block">
        <div class="date-top">{{ dateData.week }}</div>
        <div class="date-middle">{{ dateData.time }}</div>
        <div class="date-bottom">
          <div class="year-wing">
            <div class="wing-bar"></div>
            <div class="wing-bar"></div>
            <div class="wing-bar"></div>
          </div>
          <div class="date-year">{{ dateData.year }}</div>
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
            <td><vue-numeric separator="," :read-only="true" v-model="rightData.learnNums"></vue-numeric>&nbsp;题</td>
          </tr>
          <tr class="right-data-item bottom-num">
            <td>
              <div class="left-title">公众号关注总数：</div>
            </td>
            <td><vue-numeric separator="," :read-only="true" v-model="rightData.totalNum"></vue-numeric>&nbsp;人</td>
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
  name: 'NumberFlow',
  data() {
    return {
      rightData: {
        totalNum: 0,
        learnNums: 0,
        todaySubscribes: 0,
        uv: 0,
        dayjsObj: dayjs()
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
            const curDayjsObj = dayjs();
            if (this.rightData.dayjsObj.isSame(curDayjsObj, 'day')) {
              // 若与上一次的数据获取时间处于同一天则数据只允许增加
              this.rightData.totalNum = _.max([this.rightData.totalNum, parseInt(ret.data.total_num || 0)]);
              this.rightData.todaySubscribes = _.max([
                this.rightData.todaySubscribes,
                parseInt(ret.data.today_subscribes || 0)
              ]);
              this.rightData.learnNums = _.max([this.rightData.learnNums, parseInt(ret.data.learn_nums || 0)]);
              this.rightData.uv = _.max([this.rightData.uv, parseInt(ret.data.uv || 0)]);
            } else {
              this.rightData.totalNum = parseInt(ret.data.total_num || 0);
              this.rightData.todaySubscribes = parseInt(ret.data.today_subscribes || 0);
              this.rightData.learnNums = parseInt(ret.data.learn_nums || 0);
              this.rightData.uv = parseInt(ret.data.uv || 0);
            }
            this.rightData.dayjsObj = curDayjsObj;
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
    updateTime() {
      const dayjsObj = dayjs();
      this.dateData = {
        year: dayjsObj.year(),
        week: dayjsObj.format('dddd'),
        time: dayjsObj.format('HH:mm')
      };
    }
  },
  async created() {
    this.updateTime();
    this.dateInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
    this.getRightData();
  },
  async mounted() {}
};
</script>

<style lang="scss" scoped>
.number-flow {
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/statistics_bg2.jpg');
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-content {
  display: flex;
  align-items: center;
}
.left-date-block {
  border-radius: 20px;
  background-color: #404b61;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  padding: 65px 45px;
  font-size: 30px;
  .date-top {
    font-family: STHeiti, Tahoma, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', 'Microsoft Yahei',
      Simsun, sans-serif;
    font-size: 36px;
    letter-spacing: 2px;
  }
  .date-middle {
    font-size: 70px;
    margin: 55px 0 65px;
  }
  .date-bottom {
    width: 100%;
    display: flex;
    .date-year {
      margin: 0 10px;
    }
    .year-wing {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding:2px 0;
      .wing-bar {
        height: 5px;
        background-color: #df3b04;
      }
    }
  }
}
.right-data-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 580px;
  margin-left: 50px;
  .right-data-num {
    min-width: 120px;
  }
  .right-data-table {
    margin: 50px 0 40px;
  }
  .right-data-item + .right-data-item {
    margin-top: 20px;
  }
  .top-num {
    font-size: 60px;
    text-align: center;
    font-weight: bold;
    .scroll-num-wrapper {
      font-size: 70px;
      line-height: initial;
    }
    .right-data-num {
      color: #df3b04;
    }
  }
  .bottom-num {
    font-size: 25px;
    display: flex;
    align-items: center;
  }
  .left-title {
    text-align: left;
    min-width: 8.4em;
  }
}
</style>
