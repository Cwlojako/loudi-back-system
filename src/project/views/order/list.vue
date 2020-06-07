<template>
  <div class="staff">
    <el-row class="page">
      <el-col :span="24" class="top-wrapper">
        <div class="square-num">
          <span>本月订单数量</span>
          <span class="bigText">8888</span>
        </div>
        <div class="square-num">
          <span>成交金额(元)</span>
          <span class="bigText">154253545254.40</span>
        </div>
        <div class="square-num">
          <span>回款金额(元)</span>
          <span class="bigText">45525432453.23</span>
        </div>
        <div class="btn-group">
          <el-button style="background: rgb(0, 161, 108);border: none"  type="primary"
                    class="btn import-btn">导入
          </el-button>
          <el-button style="background: rgb(0, 161, 108);border: none"  type="primary"
                    class="btn export-btn">导出
          </el-button>
        </div>
      </el-col>
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
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes,pager, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="orderData"
          style="width: 95%;margin:0 auto;"
          @row-dblclick="handleRowClick"
        >
          <el-table-column prop="id" label="订单编号"></el-table-column>
          <el-table-column prop="type" label="订单类型"></el-table-column>
          <el-table-column prop="customer.realName" label="顾客名称"></el-table-column>
          <el-table-column prop="product.name " label="疗程部位"></el-table-column>
          <el-table-column prop="salon.name" label="店铺名称"></el-table-column>
          <el-table-column prop="teacher.realName" label="所属老师"></el-table-column>
          <el-table-column prop="department.name" label="所属市场"></el-table-column>
          <el-table-column prop="transactionPrice" label="成交金额"></el-table-column>
          <el-table-column prop="promotion.name" label="活动折扣"></el-table-column>
          <el-table-column prop="createAt" label="下单时间"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goOrderDetail(scope.row.id)">查看</el-button>
              <el-button type="text" size="small" @click="goOrderEdit(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Emitter from '@/framework/mixins/emitter'
  import Search from "@/framework/components/search"
  import {find, count} from '@/project/service/order'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "order",
        orderData: [], // 订单表格数据
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        // 搜索组件配置项
        searchItems: [
          {
            name: "店铺编号",
            key: "salonId",
            type: "string"
          },
          {
            name: "店铺名称",
            key: "salonName",
            type: "string"
          },
          {
            name: "疗程部位",
            key: "product",
            type: "select",
            displayValue: ["手部", "脚部", "腿部", "头部", "胸部", "腋毛"],
            value: ["手部", "脚部", "腿部", "头部", "胸部", "腋毛"]
          },
          {
            name: "所属老师",
            key: "teacher",
            type: "string"
          },
          {
            name: "订单类型",
            key: "type",
            type: "select",
            displayValue: ["暂存订单", "观察期", "已取消订单"],
            value: ["暂存订单", "观察期", "已取消订单"]
          },
          {
            name: "顾客名称",
            key: "customer",
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
            name: "活动折扣",
            key: "promotion",
            type: "select",
            displayValue: ["打板价", "亲友价", "会员价", "7.8折活动"],
            value: ["打板价", "亲友价", "会员价", "7.8折活动"]
          },
          {
            name: "订单日期",
            key: "createAt",
            type: "daterange",
          }
        ]
      }
    },
    components: {
      Search
    },
    methods: {
      // 前往订单详情页面
      goOrderDetail(id) {
        this.$router.push({path:'/order/orderDetail/' + id})
      },
      // 前往订单编辑页面
      goOrderEdit(id) {
        this.$router.push({path:'/order/editOrderDetail/' + id})
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
            if (keys[i] === 'salonId') delete this.extraParam[keys[i]]
            if (keys[i] === 'salonName') delete this.extraParam[keys[i]]
            if (keys[i] === 'product') delete this.extraParam[keys[i]]
            if (keys[i] === 'teacher') delete this.extraParam[keys[i]]
            if (keys[i] === 'customer') delete this.extraParam[keys[i]]
            if (keys[i] === 'department') delete this.extraParam[keys[i]]
            if (keys[i] === 'promotion') delete this.extraParam[keys[i]]
            if (keys[i] === 'createAt') delete this.extraParam[keys[i]]
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        // 处理店铺搜索参数
        if (searchItems.salonName && searchItems.salonId) {
          this.salonParam = {
            id: searchItems.salonId,
            name: searchItems.salonName
          }
        } else if(searchItems.salonName && !searchItems.salonId){
          this.salonParam = {
            name: searchItems.salonName
          }
        } else if(!searchItems.salonName && searchItems.salonId){
          this.salonParam = {
            id: searchItems.salonId
          }
        } else {
          delete this.salonParam
        }
        // 处理疗程部位参数
        if (searchItems.product) {
          this.productParam = {
            name: searchItems.product
          }
        } else {
          delete this.productParam
        }
        // 处理所属老师参数
        if (searchItems.teacher) {
          this.teacherParam = {
            name: searchItems.teacher
          }
        } else {
          delete this.teacherParam
        }
        // 处理所属顾客参数
        if (searchItems.customer) {
          this.customerParam = {
            name: searchItems.customer
          }
        } else {
          delete this.customerParam
        }
        // 处理所属部门参数
        if (searchItems.department) {
          this.departmentParam = {
            name: searchItems.department
          }
        } else {
          delete this.departmentParam
        }
        // 处理活动折扣参数
        if (searchItems.promotion) {
          this.promotionParam = {
            name: searchItems.promotion
          }
        } else {
          delete this.promotionParam
        }
        // 处理下单时间参数
        if (searchItems.createAt) {
          this.createAtParam = {
            'start': searchItems.createAt[0],
            'end': searchItems.createAt[1]
          }
        } else {
          delete this.createAtParam
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
          [this.model]: _t.extraParam,
          salon: _t.salonParam,
          product: _t.productParam,
          teacher: _t.teacherParam,
          customer: _t.customerParam,
          department: _t.departmentParam,
          promotion: _t.promotionParam,
          createAt: _t.createAtParam
        }
        find(param, res => {
          _t.orderData = res
          _t.getTotal()
        });
      },
      getTotal() {
        let _t = this
        let param = {
          [this.model]: _t.extraParam,
          salon: _t.salonParam,
          product: _t.productParam,
          teacher: _t.teacherParam,
          customer: _t.customerParam,
          department: _t.departmentParam,
          promotion: _t.promotionParam,
          createAt: _t.createAtParam
        }
        count(param, res => {
          _t.total = parseInt(res)
        })
      },
      handleRowClick(row) {
        this.$router.push({path: '/order/editOrderDetail/' + row.id})
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
      // 获取订单数据
      this.search(1);
    }
  }
</script>

<style lang="less" scoped>
  .page {
    padding: 20px;
    .square-num:not(:nth-child(2)) {
      margin-left: 40px;
    }
    .square-num:nth-child(2) {
      border-left: none;
    }
    .square-num {
      float: left;
      width: 250px;
      height: 100px;
      border: 1px solid #ccc;
      margin-left: 0;
      padding-top: 10px;
      padding-left: 20px;
      box-sizing: border-box;
      span {
        display: block;
        color: #999999;
      }
      .bigText {
        margin-top: 10px;
        font-size: 25px;
        color: black;
      }
    }
    .top-wrapper {
      height: 100px;
      display: flex;
      .btn-group {
        height: 100%;
        float: left;
        display: flex;
        margin-left: 50px;
        align-items: center;
        .btn {
          width: 120px;
          height: 40px;
        }
      }
    }
  }
</style>
