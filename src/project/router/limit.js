
const limit = {
  routes: [
    {
      path:'/limit/list',
      name:'limitList',
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
            name:'职位权限管理',
            path:'/limit/list'
          }
        ]
      },
      component: () => import('@/project/views/limit/list')
    },
    {
      path:'/limit/setLimit/:id',
      name:'roleShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'职位权限管理',
            path:'/limit/list'
          },
          {
            name:'设置权限',
            path:'/limit/setLimit/:id'
          }
        ]
      },
      component: () => import('@/project/views/limit/setLimit')
    },

  ]
}
export default limit;
