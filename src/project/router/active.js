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
    // 编辑
    {
      path:'/active/discount/:id',
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
            path:'/active/discount/:id'
          }
        ]
      },
      component: () => import('@/project/views/active/discount')
    },
    // 新建
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
  ]
}
export default active;
