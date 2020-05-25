const baseArgs = {
  routes: [
    {
      path:'/baseArgs/list',
      name:'baseArgsList',
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
            name:'基本参数',
            path:'/baseArgs/list'
          }
        ]
      },
      component: () => import('@/project/views/baseArgs/list')
    },
  ]
}
export default baseArgs;
