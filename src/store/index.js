import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import pathify from 'vuex-pathify'

import view from './view'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  app: 'Vuetify Map'
}

const plugins = [
  pathify.plugin
]
if (debug) {
  plugins.push(createLogger())
}

const store = new Vuex.Store({
  modules: {
    view
  },
  state,
  plugins
})

export default store
