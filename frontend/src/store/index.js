// ./frontend/src/store/index.js

import { createStore } from 'vuex';

function getUserFromLocalStorage() {
  try {
    const user = localStorage.getItem('user');
    console.log('User in localStorage:', user);
    if (user && user !== 'undefined') { // Vérifie que user n'est pas null ou undefined
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    console.error('Error parsing user data from localStorage', error);
    return null;
  }
}

const store = createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: getUserFromLocalStorage(),
  },
  mutations: {
    setLoginState(state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
      state.user = payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  actions: {
    login({ commit }, { user, token, role }) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      commit('setLoginState', { isLoggedIn: true, user: { ...user, token, role } });
    },
    logout({ commit }) {
      commit('logout');
    },
    checkLoginState({ commit }) {
      const token = localStorage.getItem('token');
      const user = getUserFromLocalStorage();
      const role = localStorage.getItem('role');

      // Ajout des instructions de débogage
      console.log('Token:', token);
      console.log('User:', user);
      console.log('Role:', role);

      if (token && user) {
        commit('setLoginState', { isLoggedIn: true, user: { ...user, token, role } });
      } else {
        commit('logout');
      }
    },
  },
});

export default store;
