
const equipment = {
  routes: [
    {
      path:'/equipment/list',
      name:'equipmentList',
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
            name:'设备列表',
            path:'/equipment/list'
          }
        ]
      },
      component: () => import('@/project/views/equipment/list')
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
    },
    {
      path:'/equipment/map',
      name:'map',
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
            name:'地图分布',
            path:'/equipment/map'
          }
        ]
      },
      component: () => import('@/project/views/equipment/map')
    },
    {
      path:'/equipment/equipmentDetail',
      name:'equipmentDetail',
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
            name:'设备详情',
            path:'/equipment/equipmentDetail'
          }
        ]
      },
      component: () => import('@/project/views/equipment/equipmentDetail')
    },
    {
      path:'/shop/addOrEditBaseInfo',
      name:'addOrEditBaseInfo',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'店铺列表',
            path:'/shop/list'
          },
          {
            name:'店铺详情',
            path:'/shop/addOrEditBaseInfo'
          }
        ]
      },
      component: () => import('@/project/views/shop/addOrEditBaseInfo')
    },
    {
      path:'/shop/shopDetail',
      name:'shopDetail',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'店铺列表',
            path:'/shop/list'
          },
          {
            name:'店铺详情',
            path:'/shop/shopDetail'
          }
        ]
      },
      component: () => import('@/project/views/shop/shopDetail')
    },
    {
      path:'/shop/settlementDetail',
      name:'settlementDetail',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'店铺列表',
            path:'/shop/list'
          },
          {
            name:'店铺详情',
            path:'/shop/shopDetail'
          },
          {
            name:'结算详情',
            path:'/shop/settlementDetail'
          }
        ]
      },
      component: () => import('@/project/views/shop/settlementDetail')
    },
    {
      path:'/shop/trainDetail',
      name:'trainDetail',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'店铺列表',
            path:'/shop/list'
          },
          {
            name:'店铺详情',
            path:'/shop/shopDetail'
          },
          {
            name:'培训详情',
            path:'/shop/trainDetail'
          }
        ]
      },
      component: () => import('@/project/views/shop/trainDetail')
    }
  ]
}
export default equipment;
