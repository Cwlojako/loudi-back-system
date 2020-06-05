<template>
  <div class="staff">
    <el-row class="page">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItems"
          @on-search="searchBySearchItem"
        ></search>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="maintenanceData"
          style="width: 95%;margin:0 auto;">
          <el-table-column prop="createAt" label="维修时间"></el-table-column>
          <el-table-column prop="employee.realName" label="维修员"></el-table-column>
          <el-table-column prop="id" label="设备编号"></el-table-column>
          <el-table-column prop="deviceModel.name " label="机型"></el-table-column>
          <el-table-column prop="department.name" label="归属市场"></el-table-column>
          <el-table-column prop="name" label="记录名称"></el-table-column>
          <el-table-column prop="repairMode" label="维修方式"></el-table-column>
          <el-table-column prop="payer" label="费用承担"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="gofixDetailPage(scope.row.id)">
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
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {find} from '@/project/service/maintenance'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "maintenance",
        maintenanceData: [], // 维修记录表格数据
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "设备编号",
            key: "device",
            type: "string"
          },
          {
            name: "机型",
            key: "deviceModel",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "归属市场",
            key: "department",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "维修员",
            key: "employee",
            type: "string"
          },
          {
            name: "维修方式",
            key: "repairMode",
            type: "select",
            displayValue: ["视频指导自行维修", "管理人员协助维修", "请电工维修", "总部派遣", "其他"],
            value: ["视频指导自行维修", "管理人员协助维修", "请电工维修", "总部派遣", "其他"]
          },
          {
            name: "费用承担",
            key: "payer",
            type: "select",
            displayValue: ["按比例承担", "总部承担", "分公司承担", "市场承担", "其他"],
            value: ["按比例承担", "总部承担", "分公司承担", "市场承担", "其他"]
          },
        ]
      }
    },
    components: {
      Search
    },
    methods: {
      // 前往维修记录详情页面
      gofixDetailPage(id) {
        this.$router.push({path:'/fix/fixDetail/' + id});
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
            if (keys[i] === 'device') delete this.extraParam[keys[i]]
            if (keys[i] === 'deviceModel') delete this.extraParam[keys[i]]
            if (keys[i] === 'department') delete this.extraParam[keys[i]]
            if (keys[i] === 'employee') delete this.extraParam[keys[i]]
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        // 处理设备编号参数
        if (searchItems.device) {
          this.deviceIdParam = {
            id: searchItems.device
          }
        } else {
          delete this.deviceIdParam
        }
        // 处理机型参数
        if (searchItems.deviceModel) {
          this.deviceModelParam = {
            name: searchItems.deviceModel
          }
        } else {
          delete this.deviceModelParam
        }
        // 处理归属部门参数
        if (searchItems.department) {
          this.departmentParam = {
            name: searchItems.department
          }
        } else {
          delete this.departmentParam
        }
        // 处理维修员参数
        if (searchItems.employee) {
          this.employeeParam = {
            realName: searchItems.employee
          }
        } else {
          delete this.employeeParam
        }
        this.search(1);
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          [this.model]: _t.extraParam,
          pageable: {
            page: 1,
            size: 10
          },
          device: this.deviceIdParam,
          deviceModel: this.deviceModelParam,
          department: this.departmentParam,
          employee: this.employeeParam
        }
        // 如果参数不需要则清除
        if (JSON.stringify(param.device) === "{}") delete param.device
        if (JSON.stringify(param.deviceModel) === "{}") delete param.deviceModel
        if (JSON.stringify(param.department) === "{}") delete param.department
        if (JSON.stringify(param.employee) === "{}") delete param.employee
        find(param, res => {
          _t.maintenanceData = res;
          _t.getTotal();
        });
      },
      getTotal() {
        let param = {
          [this.model]: this.extraParam,
          device: this.deviceIdParam,
          deviceModel: this.deviceModelParam,
          department: this.departmentParam,
          employee: this.employeeParam
        }
        // 如果参数不需要则清除
        if (JSON.stringify(param.device) === "{}") delete param.device
        if (JSON.stringify(param.deviceModel) === "{}") delete param.deviceModel
        if (JSON.stringify(param.department) === "{}") delete param.department
        if (JSON.stringify(param.employee) === "{}") delete param.employee
        find(param, res => {
          this.total = res.length
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
    },
    mounted() {
      // 获取维修记录
      this.search(1);
    }
  }
</script>

<style lang="less" scoped>
</style>
