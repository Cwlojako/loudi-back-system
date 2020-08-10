<template>
  <div class="staff page">
    <el-row>
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItems"
          @on-search="searchBySearchItem"
        ></search>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary">导入
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary">导出
          </el-button>
          <span style="margin-left: 50px;margin-right: 5px">订单总计:</span><span>9999</span>
          <span style="margin-left: 50px;margin-right: 5px">结算总计:</span><span>9999</span>
          <span style="margin-left: 50px;margin-right: 5px">欠款总计:</span><span>9999</span>
          <span style="margin-left: 50px;margin-right: 5px">退款总额:</span><span>9999</span>
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="customerData"
          style="width: 95%;margin:0 auto;"
          @row-dblclick="handleRowClick">
          <el-table-column prop="id" label="顾客编号"></el-table-column>
          <el-table-column prop="realName" label="顾客名称"></el-table-column>
          <el-table-column prop="salon.name" label="店铺名称"></el-table-column>
          <el-table-column prop="teacher.realName" label="所属老师"></el-table-column>
          <el-table-column prop="department.name" label="所属市场"></el-table-column>
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <el-table-column prop="type" label="顾客类型"></el-table-column>
          <el-table-column prop="subtype" label="疗程顾客子类型"></el-table-column>
          <el-table-column prop="responsible" label="下单部位数量"></el-table-column>
          <el-table-column prop="responsible" label="预付款总额"></el-table-column>
          <el-table-column prop="responsible" label="订单总额"></el-table-column>
          <el-table-column prop="responsible" label="结算金额"></el-table-column>
          <el-table-column prop="responsible" label="欠款金额"></el-table-column>
          <el-table-column prop="responsible" label="退款金额"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goCustomerDetail(scope.row.id)">
                查看
              </el-button>
              <el-button type="text" size="small" @click="goEditCustomerDetail(scope.row.id)">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import { findByEmployeeId, count } from '@/project/service/customer'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "customer",
        customerData: [], // 顾客表格数据
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "顾客编号",
            key: "id",
            type: "string"
          },
          {
            name: "顾客名称",
            key: "realName",
            type: "string"
          },
          {
            name: "手机号码",
            key: "phone",
            type: "string"
          },
          {
            name: "所属老师",
            key: "teacher",
            type: "string"
          },
          {
            name: "顾客类型",
            key: "type",
            type: "select",
            displayValue: ["意向客户", "疗程客户", "体验客户" ],
            value:["意向客户", "疗程客户", "体验客户" ]
          },
          {
            name: "顾客子类型",
            key: "subtype",
            type: "string"
          },
          {
            name: "所属市场",
            key: "department",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "店铺名称",
            key: "salon",
            type: "string"
          },
          {
            name: "有无退款",
            key: "",
            type: "select",
            displayValue: ["有", "无"],
            value: ["有", "无"]
          },
          {
            name: "有无欠款",
            key: "",
            type: "select",
            displayValue: ["有", "无"],
            value: ["有", "无"]
          },
          {
            name: "有无预付款",
            key: "",
            type: "select",
            displayValue: ["有", "无"],
            value: ["有", "无"]
          },
          {
            name: "性别",
            key: "gender",
            type: "select",
            displayValue: ["男", "女"],
            value: ["男", "女"]
          },
          {
            name: "订单部位",
            key: "product",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "美容师",
            key: "salon",
            type: "string"
          },
          {
            name: "订单日期",
            key: "accessAt",
            type: "daterange",
          }
        ]
      }
    },
    components: {
      Search
    },
    methods: {
      // 前往顾客详情页面
      goCustomerDetail(id) {
        this.$router.push({path:'/customer/customerDetail/' + id})
      },
      // 前往编辑顾客信息界面
      goEditCustomerDetail(id) {
        this.$router.push({path:'/customer/editCustomerDetail/' + id })
      },
      searchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.searchItems,
            len = searchItemList.length;
          i < len;
          i++
        ) {
          keys.push(searchItemList[i].key);
        }
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]]
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        console.log(this.extraParam)

        this.search(1);
      },
      toCreate() {
        this.$router.push({path: '/staff/addStaff'});
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          [this.model]: _t.extraParam
        }

        //发送请求获取顾客列表
        findByEmployeeId( param, res => {
          let data = res
          _t.customerData = data
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {
          [this.model]: _t.extraParam
        };
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleRowClick(row) {
        this.$router.push({path: '/manager/show/' + row.id})
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      }
    },
    mounted() {
      this.search(1);
    }
  }
</script>

<style lang="less" scoped>
  .el-container {
    margin-top: 20px;
    .el-aside {
      /*height: 500px;*/
      margin-left: 20px;
      /*background-color: #f5f7fa;*/
    }
    .el-main {
      /*background-color: #999999;*/
    }
  }
  .el-tree {
    .title {
      margin-right: 10px;
    }
  }
  .el-input, .el-input__inner {
    width: 350px;
  }
  .el-select /deep/ .el-input {
    width: 350px !important;
  }
  .el-dialog .el-dialog__body {
    overflow: hidden;
  }
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-button + .el-button {
    margin-left: 2px;
  }
  .el-button--default:hover {
    color: #00a16c;
    border: 1px solid #00a16c;
    background: white;
  }
  .content /deep/ .el-date-editor /deep/ .el-input__inner /deep/ .el-input__prefix /deep/ .el-input__icon {
    line-height: 32px !important;
  }

</style>
