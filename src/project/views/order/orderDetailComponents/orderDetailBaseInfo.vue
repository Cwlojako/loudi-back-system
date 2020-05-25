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
            <el-col :span="18"><div class="grid-content bg-purple-light">疗程订单</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">下单时间</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">2019-12-30  09:25</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">疗程部位</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">手部</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">原价</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">5461</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">活动折扣</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">1999</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">其他费用</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">100</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">其他费用说明</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">特殊原因</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">成交价格</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">2999</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">顾客预付定金</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">1000</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">顾客付款金额</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">1000</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">欠款金额</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">999</div></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="6" style="font-size: 18px;font-weight: bold">其他信息</el-col>
            <el-col :span="18"></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">操作员</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">林青霞</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">策单员</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">无</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">美容师</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">有</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">美容师姓名</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">张小买</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">美容师电话</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">1238546242</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">美容师奖励</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">2354</div></el-col>
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
            <el-col :span="20"><div class="grid-content bg-purple-light">张三</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">性别</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">男</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">联系电话</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">13546512546</div></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="4" style="font-size: 18px;font-weight: bold">店铺信息</el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">店铺</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">恋大自然体验店</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">店家分成比例</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">10%</div></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="4" style="font-size: 18px;font-weight: bold">观察期信息</el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">观察期剩余天数</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">20</div></el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="4" style="font-size: 18px;font-weight: bold">取消信息</el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">取消类型</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">客户不满意</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">取消说明</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">无</div></el-col>
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
  export default {
    data() {
      return {}
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      // 编辑订单详情
      editOrderDetail() {
        this.$router.push({path:'/order/editOrderDetail'});
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
</style>
