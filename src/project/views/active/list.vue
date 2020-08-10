<template>
  <div class="staff">
    <el-row class="page">
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary" @click="addActiveInfo">新建</el-button>
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
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="data"
          style="width: 95%;margin:0 auto;"
        >
          <el-table-column
            prop="name"
            label="活动名称"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="优惠类型"
          >
          </el-table-column>
          <el-table-column
            prop="startAt"
            label="开始时间"
          >
          </el-table-column>
          <el-table-column
            prop="endAt"
            label="结束时间"
          >
          </el-table-column>
          <el-table-column
            prop="department"
            label="是否进入观察期"
          >
          </el-table-column>
          <el-table-column
            prop="employee.realName"
            label="录入人"
          >
          </el-table-column>
          <el-table-column
            prop="employee.realName"
            label="状态"
          >
            <template slot-scope='scope'>
              {{scope.row.enabled ? '启用' : '禁用'}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click='toEdit(scope.row.id)'>
                编辑
              </el-button>
              <el-button type="text" size="small" @click='updateEnable(scope.row.id, scope.row.enabled)'>
                {{scope.row.enabled ? '禁用' : '启用'}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { post } from "@/framework/http/request";
  import { findAll, enable, disable } from '@/project/service/promotion'
  export default {
    data() {
      return {
        editId: 0,//编辑id
        data: [], // 活动列表数据
        pageSize: 10,
        page: 1,
        total: 0
      }
    },
    methods: {
      // 获取活动列表数据
      getPromotionData(page) {
        findAll({product: {}, pageable: {page: page, size: this.pageSize, desc: 'id'}}, res => {
          this.data = res
          this.getTotal()
        })
      },
      getTotal() {
        findAll({product: {}}, res => {
          this.total = res.length
        })
      },
      // 控制页码跳转
      handleCurrentChange(val) {
        this.page = val;
        this.getPromotionData(this.page);
      },
      // 控制当前页数据显示条数
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.getPromotionData(this.page);
      },
      // 启禁用
      updateEnable(id, status) {
        let tip = status ? '禁用' : '启用'
        if (tip === '启用') {
          enable({id}, res => {
            this.getPromotionData(1)
            this.$message({
              type: 'success',
              message: `${tip}成功`
            })
          })
        } else {
          disable({id}, res => {
            this.getPromotionData(1)
            this.$message({
              type: 'success',
              message: `${tip}成功`
            })
          })
        }
      },
      // 前往编辑页面
      toEdit(id) {
        this.$router.push({path: '/active/discount/' + id})
      },
      //前往新建页面
      addActiveInfo() {
        this.$router.push({path: '/active/discount/'})
      }
    },
    created() {
      this.getPromotionData(1)
    }
  }
</script>

<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
