import axios from 'axios'
import jwt from 'jsonwebtoken'
import axiosInstance from '@/services/axios'
import { rejectError } from '@/helpers'

function checkTokenValidity (token) {
  if (token) {
    const decodedToken = jwt.decode(token)

    return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
  }

  return false
}



export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false
  },
  getters: {
    authUser (state) {
      return state.user || null
    },
    isAuthenticated (state) {
      return !!state.user
    }
  },
  actions: {
    loginWithEmailAndPassword ({commit}, userData) {
      return axios.post('/api/user/login', userData)
        .then(res => {
          const user = res.data
          localStorage.setItem('ezc-jwt', user.token)
          commit('setAuthUser', user)
        })
        .catch(err => rejectError(err))
    },
    registerUser (context, userData) {
      return axios.post('/api/user/register', userData)
        .catch(err => rejectError(err))
    },
    logout ({commit}) {
      // For Session Authnetication !
      // return axios.post('/api/v1/users/logout')
      //   .then(() => {
      //     commit('setAuthUser', null)
      //     return true
      //   })
      //   .catch(err => {
      //     return err
      //   })

      return new Promise((resolve) => {
        localStorage.removeItem('ezc-jwt')
        commit('setAuthUser', null)
        resolve(true)
      })
    },
    getAuthUser ({commit, getters}) {
      const authUser = getters['authUser']
      const token = localStorage.getItem('ezc-jwt')
      const isTokenValid = checkTokenValidity(token)

      if (authUser && isTokenValid) { return Promise.resolve(authUser) }

      const config = {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }

      return axiosInstance.get('/api/user/me', config)
        .then((res) => {
          const user = res.data
          localStorage.setItem('ezc-jwt', user.token)
          commit('setAuthUser', user)
          commit('setAuthState', true)
          return user
        })
        .catch(err => {
          commit('setAuthUser', null)
          commit('setAuthState', true)
          return err
        })
    }
  },
  mutations: {
    setAuthUser (state, user) {
      return state.user = user
    },
    setAuthState (state, authState) {
      return state.isAuthResolved = authState
    }
  }
}
