
const customer = {
  routes: [
    {
      path:'/customer/list',
      name:'customerList',
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
            name:'顾客列表',
            path:'/customer/list'
          }
        ]
      },
      component: () => import('@/project/views/customer/list')
    },
    {
      path:'/customer/customerDetail',
      name:'customerDetail',
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
            name:'顾客列表',
            path:'/customer/list'
          },
          {
            name:'顾客基本信息',
            path:'/customer/customerDetail'
          }
        ]
      },
      component: () => import('@/project/views/customer/customerDetail')
    },
    {
      path:'/customer/editCustomerDetail',
      name:'customerDetail',
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
            name:'顾客列表',
            path:'/customer/list'
          },
          {
            name:'顾客基本信息',
            path:'/customer/customerDetail'
          },
          {
            name:'编辑顾客信息',
            path:'/customer/editCustomerDetail'
          }
        ]
      },
      component: () => import('@/project/views/customer/editCustomerDetail')
    }
  ]
}
export default customer;
