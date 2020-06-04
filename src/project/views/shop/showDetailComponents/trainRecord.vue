<template>
  <div>
    <el-row class="page">
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="trainingData"
          style="width: 95%;margin:0 auto;"
          @row-dblclick="handleRowClick">
          <el-table-column prop="trainAt" label="培训时间"></el-table-column>
          <el-table-column prop="employee.realName" label="培训人"></el-table-column>
          <el-table-column prop="subject" label="培训主题"></el-table-column>
          <el-table-column prop="studentQuantity" label="培训人数"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goTrainDetail(scope.row.id)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <el-button style="background: rgb(0, 161, 108);border: none"
                     type="primary"
                     @click="goBack">返回上一页
          </el-button>
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, pager, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {findBySalonId, count} from '@/project/service/training'
  export default {
    data() {
      return {
        // 培训数据
        trainingData: [],
        model: "training",
        pageSize: 10,
        page: 1,
        total: 0,
        // 店铺id
        id: 0
      }
    },
    methods: {
      // 前往培训记录详情页面
      goTrainDetail(id) {
        this.$router.push({path:'/shop/trainDetail/' + id});
      },
      // 返回上一页
      goBack() {
        this.$router.go(-1);
      },
      getTrainingData(page, id) {
        let param = {
          pageable: {
            page: page,
            size: this.pageSize,
          },
          salon: {id: id}
        }
        findBySalonId(param, res => {
          this.trainingData = res
          this.getTotal(id)
        })
      },
      getTotal(id) {
        count({salon: {id: id}}, res => {
          this.total = res
        })
      },
      handleRowClick(row) {
        this.$router.push({path: '/shop/trainDetail/' + row.id})
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getTrainingData(this.page, this.id);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.getTrainingData(this.page, this.id);
      },
    },
    mounted() {
      this.id = parseInt(this.$route.params.id)
      this.getTrainingData(1, this.id)
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
