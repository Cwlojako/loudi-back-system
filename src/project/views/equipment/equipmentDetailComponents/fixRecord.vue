<template>
  <div>
    <el-row class="page">
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="maintenanceData"
          style="width: 95%;margin:0 auto;">
          <el-table-column prop="createAt" label="维修时间"></el-table-column>
          <el-table-column prop="employee.realName" label="维修员"></el-table-column>
          <el-table-column prop="name" label="记录名称"></el-table-column>
          <el-table-column prop="repairMode" label="维修方式"></el-table-column>
          <el-table-column prop="payer" label="费用承担"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goFixDetailPage(scope.row.id)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, jumper, pager, prev, next"
              :total="total"
              background>
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import {findById} from '@/project/service/maintenance'

  export default {
    props:['currentScene'],
    data() {
      return {
        // 维修记录表格数据
        maintenanceData: [],
        model: "maintenance",
        pageSize: 10,
        page: 1,
        total: 0,
        // 设备id
        id: 0
      }
    },
    methods: {
      // 前往维修详情页面
      goFixDetailPage(id) {
        this.$router.push({path:'/fix/fixDetail/' + id})
      },
      search(page, id) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          deviceId: id
        }
        findById(param, res => {
          _t.maintenanceData = res;
          _t.getTotal(id);
        });
      },
      getTotal(id) {
        findById({deviceId: id}, res => {
          this.total = res.length
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page, this.id);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page, this.id);
      }
    },
    components: {
      Search
    },
    mounted() {
      this.id = parseInt(this.$route.params.id)
      this.search(1, this.id);
    }
  }
</script>

<style lang="less" scoped>
  .search /deep/ .search-item {
    margin-right: 30px !important;
  }
  .create {
    margin: 20px 42px;
  }
  .title {
    color: white;
    margin-right: 20px;
  }

  .addProcessSequence {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  .el-tree {
    height: 300px;
    overflow: auto;
  }
  ul li {
    box-sizing: border-box;
    list-style: none;
    padding-left: 10px;
    margin: 5px 0;
    cursor: pointer;
  }
  span {
    display: inline-block;
  }
  .connectTitle {
    width: 100px;
    color: #999999;
  }
  .connectText {
    width: 170px;
  }
  .connectBaseInfo p {
    margin-bottom: 8px;
  }
  .processLog {
    margin-left: 30px;
    div {
      margin-bottom: 20px;
      p {
        margin-bottom: 8px;
      }
      .name {
        color: orangered;
        margin-right: 8px;
      }
    }
  }
</style>
