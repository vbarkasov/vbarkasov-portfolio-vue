'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emailPopupIsShown: false
  },
  actions: {
    setEmailPopupVisibilityStatus({commit}, isVisible) {
      commit('EMAIL_POPUP_IS_SHOWN', isVisible)
    }
  },
  mutations: {
    EMAIL_POPUP_IS_SHOWN(state, isVisible) {
      state.emailPopupIsShown = isVisible
    }
  },
  getters: {
    emailPopupVisibilityStatus(state) {
      return state.emailPopupIsShown
    }
  },
  modules: {
    // Это приложение слишком маленькое для модулей...
  }
})
