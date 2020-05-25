<template>
  <el-row>
    <el-col style="margin:10px 1%;width: 98%;">
      <el-tabs type="border-card">
        <el-tab-pane label="iPhone">
          <iphone></iphone>
        </el-tab-pane>
        <el-tab-pane label="Android">
          <android></android>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

</template>
<script>
  import iphone from './versionComp/iphone'
  import android from "./versionComp/android"
  export default {
    components: {
      iphone, android
    }
  }
</script>
<style lang="less" scoped>
</style>
