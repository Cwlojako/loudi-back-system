
const order = {
  routes: [
    {
      path:'/order/list',
      name:'orderList',
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
            name:'订单列表',
            path:'/order/list'
          }
        ]
      },
      component: () => import('@/project/views/order/list')
    },
    {
      path:'/order/orderDetail/:id',
      name:'orderDetail',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'订单列表',
            path:'/order/list'
          },
          {
            name:'订单详情',
            path:'/order/orderDetail/:id'
          }
        ]
      },
      component: () => import('@/project/views/order/orderDetail')
    },
    {
      path:'/order/editOrderDetail/:id',
      name:'editOrderDetail',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'订单列表',
            path:'/order/list'
          },
          {
            name:'订单详情',
            path:'/order/orderDetail/:id'
          },
          {
            name:'编辑订单',
            path:'/order/editOrderDetail/:id'
          }
        ]
      },
      component: () => import('@/project/views/order/editOrderDetail')
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
export default order;
