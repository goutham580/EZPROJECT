import axios from 'axios'
import axiosInstance from '@/services/axios'
export default {
    namespaced: true,
  
    state: {
      items: [],
      item: {}
    },
    getters: {
    },
    actions: {
      fetchDistributors ({state, commit}) {
        commit('setItems', {resource: 'distributors', items: []}, {root: true})
        return axiosInstance.get('/api/dist/list')
          .then(res => {
            const distributors = res.data
            commit('setItems', {resource: 'distributors', items: distributors}, {root: true})
            return state.items
          })
      }
    }
  }