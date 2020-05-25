
const active = {
  routes: [
    {
      path:'/active/list',
      name:'activeList',
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
            name:'活动管理',
            path:'/active/list'
          }
        ]
      },
      component: () => import('@/project/views/active/list')
    },
    {
      path:'/active/discount',
      name:'discount',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'活动管理',
            path:'/active/list'
          },
          {
            name:'优惠管理',
            path:'/active/discount'
          }
        ]
      },
      component: () => import('@/project/views/active/discount')
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
export default active;
