
const treatment = {
  routes: [
    {
      path:'/treatment/list',
      name:'treatmentList',
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
            name:'疗程监管提醒',
            path:'/treatment/list'
          }
        ]
      },
      component: () => import('@/project/views/treatment/list')
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
export default treatment;
