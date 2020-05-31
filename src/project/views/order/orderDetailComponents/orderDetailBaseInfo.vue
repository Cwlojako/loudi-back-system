<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-row>
          <el-row>
            <el-col :span="6" style="font-size: 18px;font-weight: bold">订单信息</el-col>
            <el-col :span="18"></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">订单类型</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.type}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">下单时间</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.createAt}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">疗程部位</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">XXX</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">原价</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.originalPrice}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">活动折扣</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">XXX</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">其他费用</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.otherFee}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">其他费用说明</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.otherFeeComment}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">成交价格</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.paymentAmount}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">顾客预付定金</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.deposit}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">顾客付款金额</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.paymentAmount}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">欠款金额</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.arrearage}}</div></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="6" style="font-size: 18px;font-weight: bold">其他信息</el-col>
            <el-col :span="18"></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">操作员</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.operator.realName}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">策单员</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.partner.realName}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">美容师</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.beauticianName ? '有' : '无'}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">美容师姓名</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.beauticianName}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">美容师电话</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">{{order.beauticianPhone}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">美容师奖励</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">XXX</div></el-col>
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-row>
            <el-col :span="4" style="font-size: 18px;font-weight: bold">顾客信息</el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">姓名</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">性别</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">联系电话</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="4" style="font-size: 18px;font-weight: bold">店铺信息</el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">店铺</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">XXX</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">店家分成比例</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">XXX</div></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="4" style="font-size: 18px;font-weight: bold">观察期信息</el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">观察期剩余天数</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">XXX</div></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="4" style="font-size: 18px;font-weight: bold">取消信息</el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">取消类型</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{order.cancellationType}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">取消说明</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{order.cancellationDescription}}</div></el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="editOrderDetail">编辑
    </el-button>
    <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="goBack">返回上一页
    </el-button>
  </div>
</template>

<script>
  import {getById} from "@/project/service/order"
  export default {
    data() {
      return {
        // 订单id
        id: 0,
        model: 'order',
        order: {
          operator: {},
          partner: {}
        }
      }
    },
    props: {
      orderData: {
        type: Object
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      // 编辑订单详情
      editOrderDetail() {
        this.$router.push({path:'/order/editOrderDetail'});
      }
    },
    watch: {
      orderData: {
        handler(val) {
          this.order = val
          this.order.operator = val.operator
          this.order.partner = val.partner
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 15px;
  }
  .bg-purple {
    color: #999999;
  }
  .bg-purple-light {
    margin-left: 10px;
  }
</style>
