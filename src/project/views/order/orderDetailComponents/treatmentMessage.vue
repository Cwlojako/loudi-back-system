<template>
  <div>
    <el-row  class="page">
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="treatmentData"
          style="width: 95%;margin:0 auto;">
          <el-table-column prop="username" label="疗程阶段">XXX</el-table-column>
          <el-table-column prop="frequency" label="频率"></el-table-column>
          <el-table-column prop="energy" label="能量"></el-table-column>
          <el-table-column prop="refrigerationLevel" label="制冷等级"></el-table-column>
          <el-table-column prop="flashTimes" label="发光次数"></el-table-column>
          <el-table-column prop="creatAt" label="开始时间">XXX</el-table-column>
          <el-table-column prop="enAt" label="结束时间">XXX</el-table-column>
          <el-table-column fixed="right" align="center" label="疗程图片" width="260">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showTreatmentPic">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <el-button style="background: rgb(0, 161, 108);border: none" type="primary"
                     @click="goBack">返回上一页
          </el-button>
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, jumper, pager,prev, next"
              :total="total"
              background>
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="疗程图片"
      :visible.sync="treatmentPicShow"
      width="30%">
      <div class="treatmentPic">
        <img src="../../../assets/logo.png" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button @click="treatmentPicShow = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import {findByProduct} from '@/project/service/treatment'

  export default {
    props: {
      productId: {
        type: Number
      }
    },
    data() {
      return {
        treatmentPicShow:false,
        treatmentData: [],
        model: "treatment",
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {}
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      search(page, id) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
          },
          product: {id: id}
        }
        findByProduct(param, res => {
          _t.treatmentData = res;
        });
      },
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      // 显示图片
      showTreatmentPic() {
        this.treatmentPicShow = true
      }
    },
    components: {
      Search
    },
    mounted() {
      // 根据productId获取疗程信息
      this.search(1, this.productId);
    }
  }
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .treatmentPic {
    text-align: center;
  }
</style>
