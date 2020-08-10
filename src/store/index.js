import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    intervalBig: 86400000,
    income: {},
  },
  mutations: {
    SetIncome: (state, data) => {
      state.income = data;
    }
  },
  actions: {
    setIncome({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('SetIncome', data);
        resolve()
      })
    }
  },
  modules: {
  }
})
