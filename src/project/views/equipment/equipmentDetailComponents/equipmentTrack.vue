<template>
  <div>
    <search
      style="width: 95%;margin: 10px auto"
      :search-items="searchItems"
    ></search>
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  export default {
    data() {
      return {
        searchItems:[{
          name: "选择日期",
          key: "accessAt",
          type: "date",
        }]
      }
    },
    components:{
      Search
    }
  }
</script>

<style lang="less" scoped>

</style>
