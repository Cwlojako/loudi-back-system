<template>
  <div class="edit">
    <el-card class="box-card">
      <p class="title">基本信息</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="订单类型" prop="region" required>
          <el-select v-model="editFormData.region" placeholder="请选择订单类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间" prop="region" required>
          <el-select v-model="editFormData.region" placeholder="请选择下单时间">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疗程部位" prop="region" required>
          <el-select v-model="editFormData.region" placeholder="请选择疗程部位">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原价" prop="name" required>
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="活动折扣" prop="region" required>
          <el-select v-model="editFormData.region" placeholder="请选择活动折扣">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顾客付款金额" prop="name" required>
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
      </el-form>
      <p class="title">店铺信息</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="店铺" prop="name">
          恋大自然体验店
        </el-form-item>
        <el-form-item label="店铺分成比例" prop="name" required>
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
      </el-form>
      <p class="title">其他信息</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="美容师">
          <el-radio-group v-model="editFormData.resource" size="medium">
            <el-radio border label="无"></el-radio>
            <el-radio border label="有"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="margin-top: 30px">
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" >提交
        </el-button>
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="goBack">返回上一页
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getById} from '@/project/service/order'
  export default {
    data() {
      return {
        editFormData:{},
        editFormRule:{}
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      getOrderData(id) {
        getById({id: id}, res => {
          console.log(res)
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
