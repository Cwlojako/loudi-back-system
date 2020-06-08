<template>
  <div>
    <el-row class="page">
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="deviceHandoverData"
          style="width: 95%;margin:0 auto;"
          @row-dblclick="handleRowClick">
          <el-table-column prop="createAt" label="发起时间"></el-table-column>
          <el-table-column prop="operator.realName" label="发起人"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="assignorDepartment.name" label="交接方"></el-table-column>
          <el-table-column prop="assigneeDepartment.name" label="接管方"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showConnectDetail(scope.row.id)">
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
    <!--  交接详情对话框  -->
    <el-dialog
      title="交接详情"
      :visible.sync="connectDetailShow"
      width="30%">
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">发起人</div></el-col>
        <el-col :span="19"><div class="grid-content bg-purple-light">{{deviceHandover.operator.realName}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">发起时间</div></el-col>
        <el-col :span="19"><div class="grid-content bg-purple-light">{{deviceHandover.createAt}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">类型</div></el-col>
        <el-col :span="19"><div class="grid-content bg-purple-light">{{deviceHandover.type}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">交接方</div></el-col>
        <el-col :span="19"><div class="grid-content bg-purple-light">{{deviceHandover.assignorDepartment.name}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">接管方</div></el-col>
        <el-col :span="19"><div class="grid-content bg-purple-light">{{deviceHandover.assigneeDepartment.name}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">审批人</div></el-col>
        <el-col :span="19"><div class="grid-content bg-purple-light">刘小奥</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">通过时间</div></el-col>
        <el-col :span="19"><div class="grid-content bg-purple-light">2019-4-23</div></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="connectDetailShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import {findByDeviceId, findByDeviceHandover} from '@/project/service/deviceHandover'

  export default {
    data() {
      return {
        // 控制交接详情对话框的显示与隐藏
        connectDetailShow: false,
        // 设备交接表格数据
        deviceHandoverData: [],
        // 设备交接数据对象
        deviceHandover: {
          operator: {},
          assignorDepartment: {},
          assigneeDepartment: {}
        },
        model: "deviceHandover",
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 设备id
        id: 0
      }
    },
    methods: {
      // 查看交接详情
      showConnectDetail(id) {
        this.connectDetailShow = true
        // 根据交接记录id获取交接记录详情
        let param = {
          [this.model]: {id: id}
        }
        findByDeviceHandover(param, res => {
          this.deviceHandover = res
        })
      },
      search(page, id) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
          },
          deviceId: id
        }
        findByDeviceId(param, res => {
          _t.deviceHandoverData = res;
          _t.getTotal(id);
        })
      },
      // 获取结果总数
      getTotal(id) {
        let param = {
          deviceId: id
        }
        findByDeviceId(param, res => {
          this.total = res.length
        })
      },
      handleClose() {
        this.createProps.visible = false;
        this.editProps.visible = false;
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
      },
    },
    components: {
      Search
    },
    mounted() {
      // 根据设备id获取设备交接记录
      this.id = parseInt(this.$route.params.id)
      this.search(1, this.id);
    }
  }
</script>
<style lang="less" scoped>
  .el-row {
    margin-bottom: 15px;
    .bg-purple {
      color: #999999;
    }
  }
</style>
