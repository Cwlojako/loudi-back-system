import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import login from './login'
import user from  './user.js'
import baseArgs from "./baseArgs"
import messageCenter from './messageCenter'
import advice from './advice'
import version from './version'
import  staff from './staff'
import  limit from './limit'
import check from "./check"
import shop from "./shop"
import customer from "./customer"
import order from "./order"
import product from "./product"
import active from "./active"
import treatment from "./treatment"
import unusualTreatment from "./unusualTreatment"
import equipment from "./equipment"
import fix from "./fix"
import type from "./type"
import notification from "./notification";

Vue.use(Router);
Vue.use(ElementUI);

let routeList = [
  login.routes,
  baseArgs.routes,
  messageCenter.routes,
  user.routes,
  advice.routes,
  version.routes,
  staff.routes,
  limit.routes,
  check.routes,
  shop.routes,
  customer.routes,
  order.routes,
  product.routes,
  active.routes,
  treatment.routes,
  unusualTreatment.routes,
  equipment.routes,
  fix.routes,
  type.routes,
  notification.routes
];

let routes = [];

//拼接路由
routeList.map(s => {
  routes = routes.concat(s);
});

const router = new Router({
  routes: routes
});

router.beforeEach((to,from,next) => {
  const loading = ElementUI.Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });

  next();
});

router.afterEach(route => {
  const loading = ElementUI.Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  //将滚动条恢复到最顶端
  window.scrollTo(0, 0);
  setTimeout(() => {
     loading.close();
  },200);

});

export default router;
