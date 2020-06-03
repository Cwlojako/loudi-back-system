<template>
  <div>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客编号</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.id}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">姓名</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.realName}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">性别</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.gender}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">生日</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.birthday}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">年龄</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.age}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">联系电话</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.phone}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">所在城市</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.city}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客来源</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light" v-if="customer.salon !== undefined">{{customer.salon.name}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客类别</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.type}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">疗程顾客子类型</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.subtype}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客属性</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.relation}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">意向部位</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.purposePart}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">成交部位</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.purposePart}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">预收定金</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.depositAmount}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">档案录入人</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light" v-if="customer.teacher !== undefined">{{customer.teacher.realName}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">顾客标签</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.label}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">工作单位</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.company}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">备注</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">{{customer.comment}}</div></el-col>
    </el-row>
    <el-col>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goEditCustomerDetail">编辑</el-button>
      <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="goBack">返回上一页</el-button>
    </el-col>
  </div>
</template>

<script>
  import {getById} from "@/project/service/customer"
  export default {
    data() {
      return {
        id: 0,
        // 顾客数据对象
        customer: {
          teacher: {},
          salon: {}
        },
        // 当前年份
        year: 0
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      goEditCustomerDetail() {
        this.$router.push({path: '/customer/editCustomerDetail'})
      },
      getCustomerData(id) {
        getById({id: id}, res => {
          this.customer = res
        })
      }
    },
    created() {
      this.id = this.$route.params.id
      // 获取顾客信息
      this.getCustomerData(this.id)
    }
  }
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>
