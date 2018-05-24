import Vue from 'vue'
import Vuex from 'vuex'

import view from './view'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    view
  }
})

export default store
