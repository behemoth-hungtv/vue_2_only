import app from "./main";
import axios from "axios";
import store from "./stores/global.js";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  function (config) {
    const token = store.getters.token;
    config.headers = { authorization: token };
    store.commit("setValidationErrors", {});
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const token = response.data.auth_token;
    store.commit("setToken", token);
    return response;
  },
  function (error) {
    const data = error.response.data;
    if (data.type == "validation")
      store.commit("setValidationErrors", data.errors);
    else if (error.response.status == 401)
      app.$router.push("/login").catch(() => {});
    app.$toast.error(data.message);
    return Promise.reject(error);
  }
);

export default instance;
