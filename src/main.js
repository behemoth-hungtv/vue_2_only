import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import axios from "./axios.js";
import VueAxios from "vue-axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import store from "./stores/global.js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

const routes = [
  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  render: function (h) {
    return h(App);
  },
  router,
  store,
}).$mount("#app");

Vue.axios
  .post("/authenticate", {
    name: "admin",
    password: "123123123",
  })
  .then((response) => {
    console.log(response.data);
  });

setTimeout(() => {
  Vue.axios.get("/item").then((response) => {
    console.log(response.data);
  });
}, 3000);
