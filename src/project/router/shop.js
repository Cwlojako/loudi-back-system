
const shop = {
  routes: [
    {
      path:'/shop/list',
      name:'shopList',
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
            name:'店铺列表',
            path:'/shop/list'
          }
        ]
      },
      component: () => import('@/project/views/shop/list')
    },
    {
      path:'/shop/SettlementRecord',
      name:'SettlementRecord',
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
            name:'结算记录汇总',
            path:'/shop/SettlementRecord'
          }
        ]
      },
      component: () => import('@/project/views/shop/SettlementRecords')
    },
    {
      path:'/shop/trainRecord',
      name:'trainRecord',
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
            name:'培训记录汇总',
            path:'/shop/trainRecord'
          }
        ]
      },
      component: () => import('@/project/views/shop/trainRecords')
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
            name:'新增/编辑店铺',
            path:'/shop/addOrEditBaseInfo'
          }
        ]
      },
      component: () => import('@/project/views/shop/addOrEditBaseInfo')
    },
    {
      path:'/shop/shopDetail/:id',
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
            path:'/shop/shopDetail/:id'
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
export default shop;
