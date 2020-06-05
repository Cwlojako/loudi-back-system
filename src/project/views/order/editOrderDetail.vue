<template>
  <div class="edit">
    <el-card class="box-card">
      <p class="title">基本信息</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="订单类型" prop="type">
          <el-select v-model="editFormData.type" placeholder="请选择订单类型">
            <el-option label="暂存订单" value="暂存订单"></el-option>
            <el-option label="观察期" value="观察期"></el-option>
            <el-option label="已取消订单" value="已取消订单"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" prop="createAt">
          <el-date-picker type="datetime"
                          placeholder="请选择年月日"
                          v-model="editFormData.createAt"
                          value-format="yyyy-MM-dd hh:mm:ss"
                          format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="疗程部位" prop="product">
          <el-select v-model="editFormData.product.name" placeholder="请选择疗程部位">
            <el-option label="手部" value="手部"></el-option>
            <el-option label="脚部" value="脚部"></el-option>
            <el-option label="腿部" value="腿部"></el-option>
            <el-option label="头部" value="头部"></el-option>
            <el-option label="胸部" value="胸部"></el-option>
            <el-option label="腋毛" value="腋毛"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原价" prop="originalPrice">
          <el-input v-model="editFormData.originalPrice"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="活动折扣" prop="promotion">
          <el-select v-model="editFormData.paymentAmount" placeholder="请选择活动折扣">
            <el-option label="打板价" value="打板价"></el-option>
            <el-option label="亲友价" value="亲友价"></el-option>
            <el-option label="会员价" value="会员价"></el-option>
            <el-option label="7.8折活动" value="7.8折活动"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顾客付款金额" prop="paymentAmount">
          <el-input v-model="editFormData.paymentAmount"></el-input>&nbsp;元
        </el-form-item>
      <p class="title">店铺信息</p>
        <el-form-item label="店铺" prop="salon">
          <el-input v-model="editFormData.salon.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺分成比例" prop="salon">
          <el-input v-model="editFormData.salon.commissionRate"></el-input>&nbsp;%
        </el-form-item>
      <p class="title">其他信息</p>
        <el-form-item label="美容师">
          <el-radio-group v-model="isHaveBeauty" size="medium">
            <el-radio border label="无" value="无"></el-radio>
            <el-radio border label="有" value="有"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="美容师名称" prop="beauticianName" v-if="isHaveBeauty === '有'">
          <el-input v-model="editFormData.beauticianName"></el-input>
        </el-form-item>
        <el-form-item label="美容师电话" prop="beauticianPhone" v-if="isHaveBeauty === '有'">
          <el-input v-model="editFormData.beauticianPhone"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top: 30px">
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="handleUpdateOrder">提交
        </el-button>
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="goBack">返回上一页
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {findByOrderId, update} from '@/project/service/order'
  export default {
    data() {
      return {
        editFormData:{
          product: {},
          salon: {}
        },
        editFormRule:{},
        // 是否有美容师
        isHaveBeauty: false,
        // 订单id
        id: 0
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      // 更新订单
      handleUpdateOrder() {
        let param = this.editFormData
        if (this.isHaveBeauty === '无') {
          delete this.editFormData.beauticianName
          delete this.editFormData.beauticianPhone
        }
        update({order: param}, res => {
          this.getOrderData(this.id)
          this.$message({
            type: 'success',
            message: '更新订单信息成功!'
          })
        })
        console.log(this.editFormData)
      },
      getOrderData(id) {
        findByOrderId({order: {id: id}}, res => {
          this.editFormData = res[0]
          this.isHaveBeauty = res[0].beauticianName ? "有" : "无"
        })
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getOrderData(this.id)
    }
  }
</script>

<style lang="less" scoped>
  .edit {
    padding-left: 30px;
    padding-top: 30px;
    box-sizing: border-box;
    .title {
      font-weight: bold;
      margin-bottom: 15px;
    }
  }
</style>
