const staff = {
  routes: [
    {
      path:'/staff/list',
      name:'staffList',
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
            name:'员工管理',
            path:'/staff/list'
          }
        ]
      },
      component: () => import('@/project/views/staff/list')
    },
    {
      path:'/staff/addStaff/:id',
      name:'editStaff',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'员工管理',
            path:'/staff/list'
          },
          {
            name:'编辑员工',
            path:'/staff/addStaff/:id'
          }
        ]
      },
      component: () => import('@/project/views/staff/addStaff')
    },
    {
      path:'/staff/addStaff',
      name:'addStaff',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'员工管理',
            path:'/staff/list'
          },
          {
            name:'新增员工',
            path:'/staff/addStaff'
          }
        ]
      },
      component: () => import('@/project/views/staff/addStaff')
    },
    {
      path:'/staff/showStaff/:id',
      name:'showStaff',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'员工管理',
            path:'/staff/list'
          },
          {
            name:'查看信息',
            path:'/staff/showStaff/:id'
          }
        ]
      },
      component: () => import('@/project/views/staff/showStaff')
    }

  ]
}
export default staff;
