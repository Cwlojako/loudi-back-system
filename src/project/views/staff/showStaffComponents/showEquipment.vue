<template>
  <div>
    <el-row class="page">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="deviceSearchItems"
          @on-search="deviceSearchBySearchItem"
        ></search>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="deviceData"
          style="width: 95%;margin:0 auto;"
          @row-dblclick="handleRowClick">
          <el-table-column prop="number" label="设备编号"></el-table-column>
          <el-table-column prop="department" label="归属市场">
            <template slot-scope="scope">
              {{scope.row.department.name}}
            </template>
          </el-table-column>
          <el-table-column prop="department" label="归属分公司">xxx</el-table-column>
          <el-table-column prop="status" label="设备状态"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toDeviceDetail(scope.row.number)">
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
              layout="total, sizes, jumper, pager,prev, next"
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
  import {findByEmployeeId, count} from '@/project/service/device'

  export default {
    data() {
      return {
        // 设备信息搜索配置项
        deviceSearchItems: [
          {
            name: "设备编号",
            key: "number",
            type: "string"
          }],
        // 设备数据
        deviceData: [],
        model: "device",
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 设备编号
        deviceNumber: ''
      }
    },
    methods:{
      // 搜索设备信息
      deviceSearchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.deviceSearchItems,
            len = searchItemList.length;
          i < len;
          i++
        ) {
          keys.push(searchItemList[i].key);
        }
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]];
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        // 处理设备编号参数
        if (searchItems.number) {
          this.deviceNumber = searchItems.number
        } else {
          delete this.deviceNumber
        }
        this.search(1, this.id);
      },
      // 根据员工id获取所属设备列表
      search(page, id) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          employeeId: id,
          deviceNumber: this.deviceNumber
        };
        // 如果没有查询条件则清除携带参数对象
        if (param.deviceNumber === "") delete param.deviceNumber
        findByEmployeeId(param, res => {
          _t.deviceData = res
          _t.getTotal(id)
        });
      },
      getTotal(id) {
        let _t = this;
        let param = {
          [this.model]: _t.extraParam,
          isRunToday: false,
          employee: {id: id}
        };
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      // 控制双击行事件
      handleRowClick(row) {
        this.$router.push({path: '/equipment/equipmentDetail'})
      },
      // 控制分页操作
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page, this.id);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page, this.id);
      },
      // 根据设备编号跳转到设备详情
      toDeviceDetail(number) {
        this.$router.push({path: '/equipment/equipmentDetail'})
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
</style>
