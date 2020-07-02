const product = {
  routes: [
    {
      path:'/product/list',
      name:'productList',
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
            name:'产品列表',
            path:'/product/list'
          }
        ]
      },
      component: () => import('@/project/views/product/list')
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
      path:'/shop/addTrain',
      name:'addTrain',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'培训记录汇总',
            path:'/shop/trainRecord'
          },
          {
            name:'用户详情',
            path:'/shop/trainRecord'
          }
        ]
      },
      component: () => import('@/project/views/shop/addTrain')
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
    }
  ]
}
export default product;
