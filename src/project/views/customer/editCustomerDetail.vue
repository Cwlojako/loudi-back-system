<template>
  <div class="edit">
    <el-card class="box-card">
      <p class="title">基本信息</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="姓名" prop="realName" required>
          <el-input v-model="editFormData.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" required>
          <el-select v-model="editFormData.gender" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="editFormData.birthday" style="width:200px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" required>
          <el-input v-model="editFormData.phone"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="city" required>
          <el-select v-model="editFormData.city" placeholder="请选择城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顾客来源" prop="salonName" >
          <el-select v-model="editFormData.salon.name" placeholder="请选择店铺">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顾客类别" prop="subtype">
          <el-select v-model="editFormData.subtype" placeholder="请选择" clearable>
            <el-option v-for="(item, index) in customerType" :key='index' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顾客属性" prop="attr">
          <el-select v-model="editFormData.attr" placeholder="请选择" clearable>
            <el-option v-for="(item, index) in customerAttr" :key='index' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="意向部位" prop="purposePart">
          <el-select v-model="editFormData.purposePart" placeholder="请选择" clearable>
            <el-option v-for="(item, index) in customerArea" :key='index' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预收定金" prop="frontMoney">
          <el-input v-model="editFormData.frontMoney"></el-input>
        </el-form-item>
        <el-form-item label="顾客标签" prop="label">
          <el-select v-model="editFormData.label" placeholder="请选择" clearable>
            <el-option v-for="(item, index) in customerLabel" :key='index' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作单位" prop="company">
          <el-input v-model="editFormData.company"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="tip">
          <el-input type='textarea' v-model="editFormData.tip" style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top: 30px">
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary"  @click ="handleUpdateCustomer">提交
        </el-button>
        <el-button style="background: rgb(0, 161, 108);border: none"  type="primary" @click="goBack">返回上一页
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {update, getById} from '@/project/service/customer'
  export default {
    data() {
      return {
        editFormData:{},
        editFormRule:{},
        // 顾客类型可选项
        customerType: [
          {label: '意向客户', value: '意向客户'},
          {label: '疗程客户', value: '疗程客户'},
          {label: '体验客户', value: '体验客户'}
        ],
        // 顾客属性可选项
        customerAttr: [
          {label: 'VIP顾客', value: 'VIP顾客'},
          {label: '会员顾客', value: '会员顾客'},
          {label: '店家员工', value: '店家员工'},
          {label: '直系家属', value: '直系家属'},
          {label: '亲友', value: '亲友'}
        ],
        // 意向部位可选项
        customerArea: [
          {label: '头部', value: '头部'},
          {label: '手部', value: '手部'},
          {label: '腿部', value: '腿部'},
          {label: '脚部', value: '脚部'},
        ],
        // 顾客标签
        customerLabel: [
          {label: '需重点跟进', value: '需重点跟进'},
          {label: '可转介绍顾客', value: '可转介绍顾客'},
          {label: '可转介绍店家', value: '可转介绍店家'},
          {label: '消费能力强', value: '消费能力强'},
          {label: '出现过敏等副作用', value: '出现过敏等副作用'}
        ]
      }
    },
    methods:{
      // 提交用户的相关信息
      handleUpdateCustomer() {
        this.$refs.editFormRef.validate(valid => {
          if(!valid)  return false
          let param  = this.editFormData
          update({customer:param}, res => {
            this.getCustomerData(this.id)
            this.$message({
              type: 'success',
              message: '更新订单信息成功!'
            })
            //console.log(param)
          })
        })
        // let param = this.editFormData;
        // update({customer: param}, res => {
        //   this.getCustomerDate(this.id)
        //   this.$message({
        //     type: 'success',
        //     message: '更新订单信息成功!'
        //   })
        // })
      },
      goBack() {
        this.$router.go(-1);
      },
      getCustomerData(id) {
        getById({id:id}, res => {
          console.log(res)
          this.editFormData = res
        })
        console.log(this.editFormData)
      }
    },
    mounted() {
      this.id = this.$route.params.id
      this.getCustomerData(this.id)
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
