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
      fetchPurchaseOrders ({state, commit}) {
        commit('setItems', {resource: 'purchaseorders', items: []}, {root: true})
        return axiosInstance.get('/api/po/list')
          .then(res => {
            const purchaseorders = res.data
            commit('setItems', {resource: 'purchaseorders', items: purchaseorders}, {root: true})
            return state.items
          })
      },
      fetchPODetails ({state, commit}, poNum) {
        commit('setItem', {resource: 'purchaseorders', item: {}}, {root: true})
        return axiosInstance.get(`/api/po/poDetails/${poNum}`)
          .then(res => {
            const podetail = res.data
            commit('setItem', {resource: 'purchaseorders', item: podetail}, {root: true})
            return state.item
          })
      }
    }
  }