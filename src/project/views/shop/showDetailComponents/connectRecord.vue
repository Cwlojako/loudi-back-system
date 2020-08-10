<template>
  <div>
    <el-row class="page">
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="salonHandoverData"
          style="width: 95%;margin:0 auto;">
          <el-table-column prop="createAt" label="转让日期"></el-table-column>
          <el-table-column prop="assignee" label="转让人">
            <template slot-scope="scope">
              {{scope.row.assignor ? scope.row.assignor.realName : ''}}
            </template>
          </el-table-column>
          <el-table-column prop="assignor" label="接收人">
            <template slot-scope="scope">
              {{scope.row.assignee ? scope.row.assignee.realName : ''}}
            </template>
          </el-table-column>
          <el-table-column prop="assignorDepartment" label="接收人市场部">
            <template slot-scope="scope">
              {{scope.row.assignee ? scope.row.assignee.department.name : ''}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="260">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="seeOrderConnectDetail(scope.row.id)">
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
              layout="total, sizes, pager, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--  查看店铺交接详情对话框  -->
    <el-dialog
      title="店铺交接详情"
      :visible.sync="seeConnectDetailShow"
      width="50%">
      <el-row class="salon-handover-box">
        <el-col :span="16" class="salon-handover-box-left">
          <div class="left-first-baseInfoBox">
            <div class="content-item-box">
              <span class="content-title">状态</span>
              <span class="content-text">待紫大鲸审核</span>
            </div>
            <div class="content-item-box">
              <span class="content-title">发起时间</span>
              <span class="content-text"></span>
            </div>
            <div class="assignBox">
              <div class="assignBox-left">
                <div class="content-item-box">
                  <span class="content-title">发起人</span>
                  <span class="content-text">{{salonHandover.assignor.realName}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">发起人市场</span>
                  <span class="content-text">{{salonHandover.assignor.department.name}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">发起人分公司</span>
                  <span class="content-text">XXX</span>
                </div>
              </div>
              <div class="assignBox-right">
                <div class="content-item-box">
                  <span class="content-title">接收人</span>
                  <span class="content-text">{{salonHandover.assignee.realName}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">接收人市场</span>
                  <span class="content-text">{{salonHandover.assignee.department.name}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">接收人分公司</span>
                  <span class="content-text">XXX</span>
                </div>
              </div>
            </div>
          </div>
          <h3>详情</h3>
          <div class="left-first-baseInfoBox">
            <div class="assignBox">
              <div class="assignBox-left">
                <div class="content-item-box">
                  <span class="content-title">店铺编号</span>
                  <span class="content-text">{{salonData.id}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">所属老师</span>
                  <span class="content-text">{{salonData.teacher.realName}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">详细地址</span>
                  <span class="content-text">{{salonData.address}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">跑店人员</span>
                  <span class="content-text">{{salonData.founder.realName}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">结款方式</span>
                  <span class="content-text">{{salonData.settlementPeriod}}</span>
                </div>
              </div>
              <div class="assignBox-right">
                <div class="content-item-box">
                  <span class="content-title">店家分成比例</span>
                  <span class="content-text">{{salonData.commissionRate}}%</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">老板姓名</span>
                  <span class="content-text">{{salonData.bossName}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">老板电话</span>
                  <span class="content-text">{{salonData.bossPhone}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">合作状态</span>
                  <span class="content-text">{{salonData.cooperationStatus}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">项目负责人</span>
                  <span class="content-text">{{salonData.projectLeader}}</span>
                </div>
                <div class="content-item-box">
                  <span class="content-title">负责人联系方式</span>
                  <span class="content-text">{{salonData.projectLeaderPhone}}</span>
                </div>
              </div>
              <div class="right"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="salon-handover-box-right">
          <h3>流程日志</h3>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="seeConnectDetailShow = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import {findHandoverBySalonId, get} from '@/project/service/salonHandover'
  import {getById} from '@/project/service/salon'
  export default {
    data() {
      return {
        activities: [{
          content: '邱淑贞审批通过',
          timestamp: '2018-04-15'
        }, {
          content: '张曼玉给邱淑贞审批',
          timestamp: '2018-04-13'
        }, {
          content: '林青霞创建审批',
          timestamp: '2018-04-11'
        }],
        // 控制查看交接详情对话框的显示与隐藏
        seeConnectDetailShow: false,
        salonHandover: {
          assignor: {
            department: ''
          },
          assignee: {
            department: ''
          }
        },
        // 店铺数据对象
        salonData: {
          teacher: '',
          founder: ''
        },
        // 店铺交接记录
        salonHandoverData: [],
        model: "salonHandover",
        pageSize: 10,
        page: 1,
        total: 0,
        id: 0
      }
    },
    methods: {
      // 返回上一页
      goBack() {
        this.$router.go(-1);
      },
      seeOrderConnectDetail(id) {
        this.seeConnectDetailShow = true;
        get({salonHandOverId: id}, res => {
          this.salonHandover = res
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getSalonHandoverData(this.page, this.id);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.getSalonHandoverData(this.page, this.id);
      },
      // 获取店铺数据
      getSalonData(id) {
        getById({id: id}, res => {
          this.salonData = res
        })
      },
      // 获取店铺交接数据
      getSalonHandoverData(page, id) {
        let param = {
          salonId: id,
          pageable: {
            page: page,
            size: this.pageSize
          }
        }
        findHandoverBySalonId(param, res => {
          this.salonHandoverData = res
          this.getTotal(res.length)
        })
      },
      getTotal(total) {
        this.total = total
      }
    },
    components: {
      Search
    },
    created() {
      this.id = this.$route.params.id
      this.getSalonHandoverData(1, this.id)
      this.getSalonData(this.id)
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

  .salon-handover-box {
    .salon-handover-box-left {
      border-right: 1px solid #ccc;
    }
    .salon-handover-box-right {
      padding-left: 20px;
    }
    .content-item-box {
      display: flex;
      .content-title {
        flex: 0 0 100px;
        color: #ccc;
        font-weight: bolder;
        padding: 2px;
      }
      .content-text {
        flex: 1;
        padding: 2px;
      }
    }
    .left-first-baseInfoBox {
      .assignBox {
        display: flex;
        margin: 20px 0;
        .assignBox-left {
          flex: 1;
        }
        .assignBox-right {
          margin-left: 20px;
          flex: 1;
        }
      }
    }
  }



</style>
