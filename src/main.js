import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import axios from "./axios.js";
import VueAxios from "vue-axios";
import VueToast from "vue-toast-notification";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import store from "./stores/global.js";

import "vue-toast-notification/dist/theme-sugar.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(VueToast);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

router.beforeEach(async (to, from, next) => {
  if (store.state.token && (to.name == "Login" || to.name == "Register")) {
    return { name: "Home" };
  } else next();
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

const app = new Vue({
  render: function (h) {
    return h(App);
  },
  router,
  store,
}).$mount("#app");

export default app;
