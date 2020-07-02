<template>
  <div >
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
          <el-dropdown style="position: absolute;right: -9px;top: -6px"  @command="handleClick">
            <el-button type="text">
              <img src="../../assets/more.png" alt="" width="10" height="8">
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="编辑">编辑</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="text item">
          <span class="text_label">角色名称：</span>
          {{role.name}}
        </div>
        <div class="text item">
          <span class="text_label">备注：</span>
          {{role.comment}}
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="box-card-large">
        <el-tabs v-model="activeName">
          <el-tab-pane label="权限设置" name="first">
            <el-tree
              :data="moduleList"
              show-checkbox
              node-key="id"
              :default-expand-all="true"
              :props="defaultProps"
              @check-change="handleCheckChange"
            >
            </el-tree>
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </el-col>


    <i-edit
      :dialog-visible="editProps.visible"
      :edit-id="editId"
      @on-dialog-close="handleClose"
    ></i-edit>
    <!--      <el-dialog-->
    <!--        title="查看图片"-->
    <!--        :visible.sync="imgVisible"-->
    <!--        :modal-append-to-body='false'-->
    <!--        width="50%"-->
    <!--        :before-close="handleClose">-->
    <!--        <img :src="'https://www.gunghobox.com/images/'+manager.avatar" alt="" width="100%">-->
    <!--      </el-dialog>-->
  </div>
</template>

<script>
  import {get, enable, disable} from '@/project/service/role'
  import previewImg from '@/framework/components/previewImg/previewImg.vue'
  import IEdit from './edit'
  import { post } from '@/framework/http/request'
  export default {
    name: "show",
    components: {
      IEdit, previewImg
    },
    data() {
      return {
        role: {},
        editProps: {
          visible: false
        },
        imgVisible: false,
        sercetVisible: false,
        id: this.$route.params.id,
        editId: 0,
        activeName: 'first',
        page: 1,
        pageSize: 10,
        sort: {desc: ['id']},
        roleList: [],
        total: 0,
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        moduleList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created() {
      this.get();
      // this.roleSearch();
      this.getMenu();
    },
    methods: {
      get() {
        get({id: this.id}, res => {
          this.role = res;
        });
      },
      handleClose() {
        this.editProps.visible = false;
      },
      handleCheckChange(data){
        console.log(data);
      },
      handleClick(command){
        switch (command) {
          case '编辑':
            this.editId = this.id;
            this.editProps.visible = true;
            break;
        }
      },
      getMenu(){
        post("/api/menu/findAll", {}, res => {
          let array = [];
          res.map((item,index) => {
            array.push({});
            array[index].label = item.name;
            array[index].children = [];
            item.label = item.name;
            item.moduleList.map(module => {
              module.label = module.name;
              array[index].children.push(module);
            });
            item.children = item.moduleList;
          });
          array.reverse();
          console.log(array);
          this.moduleList = array;
        });
      },

    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .text_label{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .clearfix{
    position: relative;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 92%;
    margin: 20px;
    display: inline-block;
  }
  .box-card-large{
    width: 92%;
    display: inline-block;
    margin: 20px;
  }
  .el-button--text{
    color: #3e5265;
  }
  .el-button--mini{
    padding: 4px 12px;
  }
  .table-button{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
</style>
