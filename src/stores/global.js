import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = new Vuex.Store({
  state: {
    count: 1,
    token: "",
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setToken(state, value) {
      state.token = value;
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
  },

  plugins: [vuexLocal.plugin],
});

export default store;
