
const type = {
  routes: [
    {
      path:'/type/list',
      name:'typeList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'机型列表',
            path:'/type/list'
          }
        ]
      },
      component: () => import('@/project/views/type/list')
    },
    {
      path:'/equipment/addOrEditEquipment',
      name:'addOrEditEquipment',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'设备列表',
            path:'/equipment/list'
          },
          {
            name:'新增/编辑设备',
            path:'/equipment/addOrEditEquipment'
          }
        ]
      },
      component: () => import('@/project/views/equipment/addOrEditEquipment')
    },
    {
      path:'/equipment/collectHistory',
      name:'collectHistory',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'设备列表',
            path:'/equipment/list'
          },
          {
            name:'汇总统计分析',
            path:'/equipment/collectHistory'
          }
        ]
      },
      component: () => import('@/project/views/equipment/collectHistory')
    }
  ]
}
export default type;
