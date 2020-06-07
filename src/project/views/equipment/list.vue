<template>
  <div class="page">
    <el-row>
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItems"
          @on-search="searchBySearchItem"
        ></search>
      </el-col>
      <el-col :span="24" style="margin-left: 42px">
        <el-tag type="success">全部 ({{this.total}})</el-tag>
        <el-tag type="success">运行中 ({{this.enableTotal}})</el-tag>
        <el-tag type="success">关机 ({{this.disableTotal}})</el-tag>
        <el-tag type="success">今日使用过 (200)</el-tag>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                     @click="goEquipmentMessagePage">新建
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                     @click="toCreate">导入
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus" type="primary"
                     @click="toCreate">导出
          </el-button>
          <el-dropdown :trigger="'click'" @command="handleClick" size="medium" @visible-change="onMenuChange">
            <el-button icon="el-icon-menu" style="background:#3e5265;color: white ">
              更多操作<i class="el-icon-caret-bottom" ref="rotate" style="transition: all .3s;"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-circle-check"
                command="启用"
                :disabled="selectList.findIndex(s=>{return s.enabled}) >=0 || selectList.length === 0"
                :style="(selectList.findIndex(s=>{return s.enabled}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)','cursor': 'not-allowed'}:{'color':'#fff'}"
                @click="batchEnable"
              >
                启用
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-circle-close"
                command="禁用"
                :disabled="selectList.findIndex(s=>{return !s.enabled}) >=0 || selectList.length === 0"
                :style="(selectList.findIndex(s=>{return !s.enabled}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
                @click.stop="batchDisable"
              >
                禁用
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button style="background: rgb(0, 161, 108);border: none"  type="primary"
                     @click="goCollectHistoryPage">汇总统计历史
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none"  type="primary"
                     @click="goMapPage">地图分布
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
          :data="deviceData"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="number" label="设备编号"></el-table-column>
          <el-table-column prop="deviceModel.name" label="机型"></el-table-column>
          <el-table-column prop="department.name" label="归属市场"></el-table-column>
          <el-table-column prop="department.manager.realName" label="部门负责人"></el-table-column>
          <el-table-column prop="department.name" label="归属分公司"></el-table-column>
          <el-table-column prop="status" label="运行状态"></el-table-column>
          <el-table-column prop="runAt" label="最后运行时间" width='180'></el-table-column>
          <el-table-column prop="handed" label="有无交接历史">
            <template slot-scope="scope">
              {{scope.row.handed ? '有' : '无'}}
            </template>
          </el-table-column>
          <el-table-column prop="repaired" label="有无维修历史">
            <template slot-scope="scope">
              {{scope.row.repaired ? '有' : '无'}}
            </template>
          </el-table-column>
          <el-table-column prop="enabled" label="设备状态">
            <template slot-scope="scope">
              {{scope.row.enabled ? '启用' : '禁用'}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goEquipmentDetailPage(scope.row.id)">
                查看
              </el-button>
              <el-button type="text" size="small" @click="goEquipmentMessagePage(scope.row.id)">
                编辑
              </el-button>
              <el-button type="text" size="small" @click.stop="handleStatusChange(scope.row)">
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
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search";
  import {find, count, enable, disable} from '@/project/service/device'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "device",
        selectList: [],
        deviceData: [], // 设备表格数据
        pageSize: 10,
        page: 1,
        total: 0,
        // 运行设备数量
        disableTotal: 0,
        // 关机设备数量
        enableTotal: 0,
        extraParam: {},
        departmentParam: {},
        deviceModelParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "设备编号",
            key: "number",
            type: "string"
          },
          {
            name: "归属市场",
            key: "department",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "有无维修记录",
            key: "repaired",
            type: "select",
            displayValue: ["有", "无"],
            value: ["有", "无"]
          },
          {
            name: "运行状态",
            key: "status",
            type: "select",
            displayValue: ["运行中", "关机"],
            value: ["运行中", "关机"]
          },
          {
            name: "有无交接历史",
            key: "handed",
            type: "select",
            displayValue: ["有", "无"],
            value: ["有", "无"]
          },
          {
            name: "机型",
            key: "deviceModel",
            type: "select",
            displayValue: [],
            value: []
          }
        ]
      }
    },
    components: {
      Search
    },
    methods: {
      // 新建设备
      toCreate() {
        this.$router.push({path: '/staff/addStaff'});
      },
      // 编辑设备
      goEquipmentMessagePage(id) {
        this.$router.push({path:'/equipment/addOrEditEquipment/' + id});
      },
      // 查看设备
      goEquipmentDetailPage(id) {
        this.$router.push({path:'/equipment/equipmentDetail/' + id});
      },
      // 前往汇总历史统计页面
      goCollectHistoryPage() {
        this.$router.push({path:'/equipment/collectHistory'});
      },
      // 前往地图分布页面
      goMapPage() {
        this.$router.push({path:'/equipment/map'});
      },
      handleStatusChange(row) {
        let status;
        let _t = this;
        if (row.enabled) {
          status = '禁用'
        } else {
          status = '启用'
        }
        this.$confirm(`确定${status}选中内容？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (status === '禁用') {
            disable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已禁用!'
              });
              _t.search(_t.page);
            })
          } else {
            enable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已启用!'
              });
              _t.search(_t.page);
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

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
            if (keys[i] === 'department') delete this.extraParam[keys[i]]
            if (keys[i] === 'deviceModel') delete this.extraParam[keys[i]]
            // 处理参数
            if (keys[i] === 'handed' || keys[i] === 'repaired') {
              this.extraParam[keys[i]] = searchItems[keys[i]] === '有'
            }
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        // 处理所属部门参数
        if (searchItems.department) {
          this.departmentParam = {
            name: searchItems.department
          }
        } else {
          delete this.departmentParam
        }
        // 处理机型参数
        if (searchItems.deviceModel) {
          this.deviceModelParam = {
            name: searchItems.deviceModel
          }
        } else {
          delete this.deviceModelParam
        }
        this.search(1);
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize
          },
          isRunToday: false,
          [this.model]: _t.extraParam,
          department: _t.departmentParam,
          deviceModel: _t.deviceModelParam
        }
        // 如果参数不需要则清除
        if (JSON.stringify(param.department) === "{}") delete param.department
        if (JSON.stringify(param.deviceModel) === "{}") delete param.deviceModel
        find(param, res => {
          _t.deviceData = res;
          // 获取查询总数
          _t.getTotal()
          // 获取运行中 关机设备总数
          _t.getStatusCount()
        });
      },
      // 获取总数
      getTotal() {
        let _t = this
        let param = {
          [this.model]: _t.extraParam,
          isRunToday: false,
          department: _t.departmentParam,
          deviceModel: _t.deviceModelParam
        }
        // 如果参数不需要则清除
        if (JSON.stringify(param.department) === "{}") delete param.department
        if (JSON.stringify(param.deviceModel) === "{}") delete param.deviceModel
        count(param, res => {
          _t.total = parseInt(res)
        })
      },
      // 获取运行中，关机中设备数量
      getStatusCount() {
        let _t = this
        let param = {
          isRunToday: false,
          [this.model]: _t.extraParam,
          department: _t.departmentParam,
          deviceModel: _t.deviceModelParam
        }
        // 如果参数不需要则清除
        if (JSON.stringify(param.department) === "{}") delete param.department
        if (JSON.stringify(param.deviceModel) === "{}") delete param.deviceModel
        find(param, res => {
          // 把运行数，关机数置为0
          this.disableTotal = 0
          this.enableTotal = 0
          res.forEach(item => {
            if (item.status === '运行中') {
              this.enableTotal++
            } else {
              this.disableTotal++
            }
          })
        })
      },
      //批量启用
      batchEnable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            enable({id: s.id}, res => {
              _t.search(_t.page);
              this.$message({
                type: 'success',
                message: '启用成功!'
              });
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量禁用
      batchDisable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定禁用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            disable({id: s.id}, res => {
              _t.search(_t.page);
              this.$message({
                type: 'success',
                message: '禁用成功!'
              })
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
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
      handleClick(command) {
        switch (command) {
          case '启用':
            this.batchEnable()
            break
          case '禁用':
            this.batchDisable()
            break
        }
      },
      // 控制行是否选中
      handleSelectionChange(val) {
        this.selectList = val;
      }
    },
    mounted() {
      // 获取设备列表信息
      this.search(1)
    }
  }
</script>

<style lang="less" scoped>
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
    padding-bottom: 20px;
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
