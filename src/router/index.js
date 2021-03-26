import Vue from "vue";
import VueRouter from "vue-router";

import routerSarkes from './sarkes'
import routerIndex from './routes' 
import routerOblik from './oblik' 
import routerYanfar from './yanfar' 

Vue.use(VueRouter);

const routes = [
  ...routerSarkes,
  ...routerIndex,
  ...routerOblik,
  ...routerYanfar,
];

const router = new VueRouter({
  routes
});

export default router;
