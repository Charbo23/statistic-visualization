<template>
    <div id="txMap"></div>
</template>

<script>
    import arcData from './arcData'
    export default {
        name: "ArcFlow",
        methods: {
            initMap() {
                var center = new TMap.LatLng(36, 118);
                var data = arcData;
                //初始化地图
                var map = new TMap.Map("txMap", {
                    zoom: 5,//设置地图缩放级别
                    pitch: 30,
                    center: center,//设置地图中心点坐标
                    mapStyleId: "style1" //个性化样式
                });
                //初始化弧线图并添加至map图层
                new TMap.visualization.Arc({
                    mode: 'vertical' // 弧线平面与地平面垂直

                })
                    .addTo(map)
                    .setData(data);//设置数据
            }
        },
        mounted() {
          setTimeout(() => {
            this.initMap();
          }, 1000)
        }
    }
</script>

<style scoped lang="scss">
    #txMap{
        height: 100%;
    }
</style>