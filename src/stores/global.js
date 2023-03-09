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
    validationErrors: {},
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setToken(state, value) {
      state.token = value;
    },
    setValidationErrors(state, payload) {
      state.validationErrors = payload;
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    getErrors: (state) => (name) => {
      return state.validationErrors[name] ?? [];
    },
  },

  plugins: [vuexLocal.plugin],
});

export default store;
