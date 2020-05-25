<template>
  <div class="edit">
    <el-card class="box-card">
      <p class="title">基本信息</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="活动名称" prop="name" required>
          <el-input v-model="editFormData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="editFormData.date1" style="width: 200px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="editFormData.date1" style="width: 200px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="生效部门" required>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加部门</el-button>
        </el-form-item>
        <el-form-item label="活动说明" prop="name" required>
          <el-input v-model="editFormData.name" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <p class="title">赠品规则</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="有无赠品">
          <el-radio-group v-model="editFormData.asdasd" size="medium">
            <el-radio border label="无"></el-radio>
            <el-radio border label="有"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <p class="title">活动规则</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="优惠形式">
          <el-radio-group v-model="editFormData.adsd" size="medium">
            <el-radio border label="满减优惠"></el-radio>
            <el-radio border label="固定折扣"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="使用条件" prop="name" required>
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="优惠面额" prop="name" required>
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
      </el-form>
      <p class="title">活动产品</p>
      <el-form :model="editFormData" :rules="editFormRule" ref="editFormRef" label-width="120px" class="demo-ruleForm" label-position="left">
        <el-form-item label="促销商品">
          <el-radio-group v-model="editFormData.resource" size="medium">
            <el-radio border label="全部商品"></el-radio>
            <el-radio border label="指定商品"></el-radio>
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
  export default {
    data() {
      return {
        editFormData:{},
        editFormRule:{},
        inputVisible: false,
        inputValue: ''
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        this.inputVisible = false;
        this.inputValue = '';
      }
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
      margin-top: 40px;
      margin-bottom: 15px;
    }
  }

  .input-new-tag {
    width: 100px;
  }

</style>
