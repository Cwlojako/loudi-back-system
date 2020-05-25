<template>
  <div class='detail-wrapper'>
    <el-col :span="24" class='detail-wrapper-right'>
      <el-card class="box-card-large">
        <el-tabs v-model="activeName">
          <el-tab-pane label="设置权限" name="first">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expand-all="true"
              :default-checked-keys="defaultList"
              :props="defaultProps"
              @check-change="handleCheckChange"
            >
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>


  </div>
</template>

<script>
  import {get, enable, disable,addModule,removeModule} from '@/project/service/role'
  import {findAll} from '@/project/service/menu'
  import {findByRoleId} from '@/project/service/module'

  export default {
    name: "roleDetail",
    components: {},
    data() {
      return {
        role: {},
        editProps: {
          visible: false
        },
        imgVisible: false,
        id: this.$route.params.id,
        editId: 0,
        activeName: 'first',
        page: 1,
        pageSize: 10,
        sort: {desc: ['id']},
        roleList: [],
        total: 0,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        defaultList:[]
      }
    },
    created() {
      this.get();
      // this.roleSearch();
      this.findByRoleId();
      // console.log(menuModel);
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
      handleCheckChange(data, isSelect){
        console.log(data);
        console.log(isSelect);
        if (!data.children) {
          if (isSelect) {
            // 添加权限
            addModule({roleId:this.id,moduleId:data.id},res => {
              this.$message.success('添加成功');
            })
          }else {
            // 删除权限
            removeModule({roleId:this.id,moduleId:data.id},res => {
              this.$message.success('删除成功');
            })
          }
        }
      },
      handleClick(command){
        switch (command) {
          case '编辑':
            this.editId = this.id;
            this.editProps.visible = true;
            break;
        }
      },

      // 获取所有权限并将数据处理成符合树形结构的数据形式
      getMenu(){
        findAll({},res => {
          let list = res.map((s,i) => {
            // 获取二级权限
            let arr = s.moduleList.map((item,index) => {
              let obj = {
                id:item.id,
                label:item.name,
                path: item.path
              };
              return obj;
            });
            return {
              id:s.id,
              label:s.name,
              children:arr
            }
          });
          this.data = list;
        })
      },

      // 根据角色id获取该角色的权限
      findByRoleId(){
        findByRoleId({roleId:this.id},res => {
          // 获取权限对应的id数组并赋值给树形结构为默认选中,
          this.defaultList = res.map(s => {
            return s.id;
          });
          this.getMenu();
        })
      },
      handleSaveSuccess(){
        this.get();
        this.editProps.visible = false;
      }
    }
  }
</script>

<style scoped>
</style>
