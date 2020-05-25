const messageCenter = {
  routes: [
    {
      path: '/messageCenter/list',
      name: 'messageCenterList',
      meta: {
        isShowHeader: true,
        isShowLeftSider: true,
        keepAlive: false,
        breadcrumb: [
          {
            name: '首页',
            path: '/index'
          },
          {
            name: '消息中心',
            path: '/messageCenter/list'
          }
        ]
      },
      component: () => import('@/project/views/messageCenter/list.vue')
    }
  ]
}
export default messageCenter;
