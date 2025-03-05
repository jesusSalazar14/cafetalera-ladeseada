import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
  },
  actions: {
    login({ commit }, credentials) {
      if (response.data.token) {
        commit('setToken', response.data.token);
      }
    },
  },
});

export default store;