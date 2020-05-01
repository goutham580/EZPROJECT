import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import distributors from './modules/distributors'
import purchaseorders from './modules/purchaseorders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    distributors,
    purchaseorders,
  },  
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    setItems (state, {resource, items}) {
        state[resource].items = items
    },
    setItem (state, {resource, item}) {
    state[resource].item = item
    },
  },
  actions: {

  },
})
