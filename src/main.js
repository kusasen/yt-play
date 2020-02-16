import Vue from 'vue'
import Router from "vue-router";
import VueResource from 'vue-resource'
import App from './App.vue'
import Home from "./views/Home";
import Search from "./views/Search";


Vue.use(Router);
Vue.use(VueResource);

const routes = [
  {
    path: "/search",
    component: Search
  },
  {
    path: "/home",
    component: Home
  }
];

const router = new Router({
  linkActiveClass: "active",
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
