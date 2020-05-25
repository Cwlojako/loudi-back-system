
const check = {
  routes: [
    {
      path:'/check/list',
      name:'checkList',
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
            name:'审批管理',
            path:'/check/list'
          }
        ]
      },
      component: () => import('@/project/views/check/list')
    }
  ]
}
export default check;
