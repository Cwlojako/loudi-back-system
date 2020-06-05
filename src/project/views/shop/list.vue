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
      <!--      标签-->
      <el-col :span="24" style="margin-left: 42px">
        <el-tag type="success">全部 ({{total}})</el-tag>
        <el-tag type="success">已合作 ({{firstCount}})</el-tag>
        <el-tag type="success">已洽谈有意向 ({{secondCount}})</el-tag>
        <el-tag type="success">已洽谈无意向 ({{thirdCount}})</el-tag>
        <el-tag type="success">微信沟通尚未见面洽谈 ({{forthCount}})</el-tag>
        <el-tag type="success">已取消 ({{fifthCount}})</el-tag>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <el-button style="background: rgb(0, 161, 108);border: none"  type="primary"
                     @click="goSettlementRecord">结算记汇总计
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none"  type="primary"
                     @click="gotrainRecord">培训记录总计
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none" type="primary">导入
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none" type="primary">导出
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary" @click="toAddSalon">新增
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
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="data"
          style="width: 95%;margin:0 auto;"
          @row-dblclick="handleRowClick">
          <el-table-column prop="id" label="店铺编号"></el-table-column>
          <el-table-column prop="name" label="店铺名称"></el-table-column>
          <el-table-column prop="category" label="分类"></el-table-column>
          <el-table-column prop="teacher.realName" label="所属老师"></el-table-column>
          <el-table-column prop="department.name" label="归属市场"></el-table-column>
          <el-table-column prop="customerQuantity" label="成交数量"></el-table-column>
          <el-table-column prop="responsible" label="预付款总额" width="70px"></el-table-column>
          <el-table-column prop="responsible" label="订单总额"></el-table-column>
          <el-table-column prop="responsible" label="结算金额"></el-table-column>
          <el-table-column prop="responsible" label="欠款金额"></el-table-column>
          <el-table-column prop="responsible" label="退款金额"></el-table-column>
          <el-table-column prop="cooperationStatus" label="合作状态"></el-table-column>
          <el-table-column prop="cooperationSubStatus" label="合作子状态" width="70px"></el-table-column>
          <el-table-column prop="responsible" label="培训次数"></el-table-column>
          <el-table-column prop="responsible" label="未出单天数" width="70px"></el-table-column>
          <el-table-column prop="deviceAssigned" label="有无设备"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goShopDetail(scope.row.id)">查看</el-button>
              <el-button type="text" size="small" @click="goShopEdit(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="total-wrapper">
      <span class="total-wrapper-item">订单总计:&nbsp;9999</span>
      <span class="total-wrapper-item">结算总计:&nbsp;9999</span>
      <span class="total-wrapper-item">欠款总计:&nbsp;9999</span>
      <span class="total-wrapper-item">退款总额:&nbsp;9999</span>
    </div>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {find, count, countBySalonExample} from '@/project/service/salon'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "salon",
        data: [], // 员工表格数据
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 归属老师/员工搜索参数
        teacherParam: {},
        // 归属市场参数
        departmentParam: {},
        // 跑店人员参数
        founderParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "店铺编号",
            key: "id ",
            type: "string"
          },
          {
            name: "店铺名称",
            key: "name",
            type: "string"
          },
          {
            name: "分类",
            key: "category",
            type: "select",
            displayValue: ["美容美发", "养生", "其他"],
            value: ["美容美发", "养生", "其他"]
          },
          {
            name: "所属老师",
            key: "teacher",
            type: "string"
          },
          {
            name: "归属市场",
            key: "department",
            type: "string"
          },
          {
            name: "状态",
            key: "enabled",
            type: "select",
            displayValue: ["启用", "禁用"],
            value: ["启用", "禁用"]
          },
          {
            name: "合作子状态",
            key: "cooperationSubStatus",
            type: "select",
            displayValue: ["已出单", "未出单"],
            value: ["已出单", "未出单"]
          },
          {
            name: "跑店人员",
            key: "founder",
            type: "string",
          },
          {
            name: "有无设备",
            key: "deviceAssigned",
            type: "select",
            displayValue: ["有", "无"],
            value: ["有", "无"]
          }
        ],
        // 已合作
        firstCount: 0,
        // 已洽谈有意向
        secondCount: 0,
        // 已洽谈无意向
        thirdCount: 0,
        // 微信沟通尚未见面洽谈
        forthCount: 0,
        // 已取消
        fifthCount: 0
      }
    },
    components: {
      Search
    },
    methods: {
      // 前往店铺详情页面
      goShopDetail(id) {
        this.$router.push({path:'/shop/shopDetail/' + id})
      },
      // 前往结算记录总汇界面
      goSettlementRecord() {
        this.$router.push({path:'/shop/SettlementRecord'})
      },
      // 前往培训记录总汇界面
      gotrainRecord() {
        this.$router.push({path:'/shop/trainRecord'});
      },
      // 前往新增店铺页面
      toAddSalon() {
        this.$router.push({path:'/shop/addOrEditBaseInfo', query:{
            activeName:'0'
        }})
      },
      // 前往编辑店铺页面
      goShopEdit(id) {
        this.$router.push({path:'/shop/addOrEditBaseInfo/' + id, query:{
            activeName:'0'
          }})
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
            this.extraParam[keys[i]] = searchItems[keys[i]];
            if (keys[i] === 'teacher') delete this.extraParam[keys[i]]
            if (keys[i] === 'department') delete this.extraParam[keys[i]]
            if (keys[i] === 'founder') delete this.extraParam[keys[i]]
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        // 处理归属老师参数
        if (searchItems.teacher) {
          this.teacherParam = {
            realName: searchItems.teacher
          }
        } else {
          delete this.teacherParam
        }
        // 处理归属市场参数
        if (searchItems.department) {
          this.departmentParam = {
            name: searchItems.department
          }
        } else {
          delete this.departmentParam
        }
        // 处理跑店人员参数
        if (searchItems.founder) {
          this.founderParam = {
            realName: searchItems.founder
          }
        } else {
          delete this.founderParam
        }
        this.search(1);
      },
      // 获取店铺列表数据
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
          },
          [this.model]: _t.extraParam,
          teacher: _t.teacherParam,
          department: _t.departmentParam,
          founder: _t.founderParam
        };
        // 如果没有查询条件则清除携带参数对象
        if (JSON.stringify(param.teacher) === "{}") delete param.teacher
        if (JSON.stringify(param.department) === "{}") delete param.department
        if (JSON.stringify(param.founder) === "{}") delete param.founder
        find(param, res => {
          _t.data = res;
          // 动态查询总数
          _t.getTotal();
          // 动态查询各个合作状态的总数
          _t.getStatusCount()
        });
      },
      // 获取总数
      getTotal() {
        let _t = this;
        let param = {
          [this.model]: _t.extraParam,
          teacher: _t.teacherParam,
          department: _t.departmentParam,
          founder: _t.founderParam
        };
        // 如果没有查询条件则清除携带参数对象
        if (JSON.stringify(param.teacher) === "{}") delete param.teacher
        if (JSON.stringify(param.department) === "{}") delete param.department
        if (JSON.stringify(param.founder) === "{}") delete param.founder
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      // 获取已合作总数
      getStatusCount() {
        let _t = this;
        let param = {
          [this.model]: _t.extraParam,
          teacher: _t.teacherParam,
          department: _t.departmentParam,
          founder: _t.founderParam
        }
        // 如果没有查询条件则清除携带参数对象
        if (JSON.stringify(param.teacher) === "{}") delete param.teacher
        if (JSON.stringify(param.department) === "{}") delete param.department
        if (JSON.stringify(param.founder) === "{}") delete param.founder
        find(param, res => {
          // 把各个和合作状态的初始值置为0
          this.firstCount = 0
          this.secondCount = 0
          this.thirdCount = 0
          this.forthCount = 0
          this.fifthCount = 0
          res.forEach(item => {
            switch (item.cooperationStatus) {
              case "已合作":
                this.firstCount++
                break
              case "已洽谈有意向":
                this.secondCount++
                break
              case "已洽谈无意向":
                this.thirdCount++
                break
              case "微信沟通尚未见面洽谈":
                this.forthCount++
                break
              case "已取消":
                this.fifthCount++
                break
            }
          })
        })
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
      // 获取店铺列表数据
      this.search(1)
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
  .total-wrapper {
    padding: 20px 0;
    font-size: 16px;
    font-weight: bolder;
    .total-wrapper-item {
      margin-left: 20px;
    }
  }
</style>
