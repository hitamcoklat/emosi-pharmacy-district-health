import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

const state = {
  isLogged: !localStorage.getItem('token'),
  userData: [],
  activeLink: [],
  statusDrawer: true,
  statusData: ''
}

const mutations = {
  LOGIN_USER(state, data) {
    state.isLogged = true
    state.userData = data
  },
  LOGOUT_USER(state) {
    state.isLogged = false
    state.userData = []
  },
  ACTIVE_LINK(state, data) {
    state.activeLink = data
  },
  SET_STATUS_DATA(state, data) {
    state.statusData = data
  },
  STATUS_DRAWER(state, data) {
    state.statusDrawer = data
  }
}

const getters = {
  userData: state => state.userData,
  isLogged: state => state.isLogged,
  statusDrawer: state => state.statusDrawer,
  activeLink: state => state.activeLink,
  statusData: state => state.statusData
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  getters,
  state,
  mutations,
  actions: {},
  modules: {}
});
