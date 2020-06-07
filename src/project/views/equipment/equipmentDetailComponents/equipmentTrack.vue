<template>
  <div class='page'>
    <search
      style="width: 95%;margin: 10px auto"
      :search-items="searchItems"
    ></search>
    <div id='container' style="width:700px; height:400px;"></div>
    <div class="input-card">
    <h4>轨迹回放控制</h4>
    <div class="input-item">
        <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation()"/>
        <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation()"/>
    </div>
    <div class="input-item">
        <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation()"/>
        <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation()"/>
    </div>
</div>
  </div>
</template>

<script>
  import Search from "@/framework/components/search"
  export default {
    data() {
      return {
        searchItems:[{
          name: "选择日期",
          key: "accessAt",
          type: "date",
        }],
        map: null,
        marker: null,
        polyline: null,
        lineArr: [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]],
      }
    },
    components:{
      Search
    },
    methods: {
      initMap() {
        let that = this
        this.map =  new AMap.Map("container", {
          resizeEnable: true,
          zoom: 17
        })
        AMap.plugin(["AMap.ToolBar"], function() {
          //加载工具条
          var tool = new AMap.ToolBar();
          that.map.addControl(tool);
        })
        this.marker = new AMap.Marker({
          map: this.map,
          position:[116.478935,39.997761],
          icon: "https://webapi.amap.com/images/car.png",
          offset: new AMap.Pixel(-26, -13), //调整图片偏移
          autoRotation: true, //自动旋转
          angle: -90 //图片旋转角度
        })
      },
      initRoad() {
        //绘制还未经过的路线
        this.polyline = new AMap.Polyline({
          map: this.map,
          path: this.lineArr,
          showDir: true,
          strokeColor: "red", //线颜色--蓝色
          strokeOpacity: .8,     //线透明度
          strokeWeight: 10, //线宽
          strokeStyle: "solid"  //线样式
        })
        var passedPolyline = new AMap.Polyline({
          map: this.map,
          // path: lineArr,
          strokeColor: "#AF5",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 10,      //线宽
          strokeStyle: "solid"  //线样式
        })
        this.marker.on("moving", e => {
          passedPolyline.setPath(e.passedPath);
        })
        this.map.setFitView()
      },
      startAnimation () {
        this.marker.moveAlong(this.lineArr, 1000);
      },
      pauseAnimation () {
        this.marker.pauseMove();
      },
      resumeAnimation () {
        this.marker.resumeMove();
      },
      stopAnimation () {
        this.marker.stopMove();
      }
    },
    mounted() {
      setTimeout(() => {
        this.initMap()
        this.initRoad()
      }, 1500)
    }
  }
</script>

<style lang="less" scoped>
.page {
  overflow-x: hidden;
  overflow-y: auto;;
}
#container {
  position: relative;
}
.input-card {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.input-card .btn{
  margin-right: 1.2rem;
  width: 9rem;
}
.input-card .btn:last-child{
  margin-right: 0;
}
</style>
