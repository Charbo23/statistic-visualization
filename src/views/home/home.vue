<template>
  <div class="home_page">
    <div class="content_group">
      <div class="content_padding">
        <el-carousel
                :initial-index="0"
                :autoplay="false"
        >
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
        <div class="right_data">
            <div class="first_group">
                <ICountUp
                    :delay="delay"
                    :endVal="endVal"
                    :options="options"
                    @ready="onReady"
                ></ICountUp>
            </div>
          <div class="second_group">

          </div>
          <div class="third_group">数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import heatMap from "../../components/heatMap/heatMap";
  import ArcFlow from "../../components/ArcFlow/ArcFlow";
  import ICountUp from 'vue-countup-v2';
  import { removeToken } from "../../utils/auth";

  export default {
    name: 'home',
    data() {
      return {
        value2: ['2020-01-01', '2020-04-06'],
        delay: 1000,
        endVal: 120500,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      }
    },
    components: {
      heatMap,
      ArcFlow,
      ICountUp
    },
    methods: {
      onReady: function(instance, CountUp) {
        const that = this;
        instance.update(that.endVal + 100);
      },
      // 退出登录
      loginOut() {
        this.$confirm('您确定退出账号吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeToken();
          this.$router.replace({
            path: '/login'
          })
        }).catch(() => {
        });
        // this.$router.replace({
        //   path: '/login'
        // })
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
  @import "./home";
  ::v-deep .dataPickMy{
    background: transparent;
    border: unset;
    width: unset;
    i{
      color: #B5F0EC !important;
    }
    input{
      background: transparent;
      color: #B5F0EC !important;
      font-size: 20px;
      font-weight: 500;
      width: 180px;
    }
    .el-range-separator{
      width: unset;
      padding: 0;
      font-size: 30px;
      color: #B5F0EC !important;
      margin-top: -4px;
    }
  }
</style>
