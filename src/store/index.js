import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import createLogger from 'vuex/dist/logger'
import pathify from 'vuex-pathify'

import view from './view'
import layers from './layers'
import UI from './ui'

const vuexStorage = new VuexPersist({
  key: 'maps-vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: (state) => {
    const { UI, ...reducedState } = state
    return reducedState
  },
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  app: 'Vuetify Map'
}

const plugins = [
  vuexStorage.plugin,
  pathify.plugin
]
if (debug) {
  plugins.push(createLogger())
}

const store = new Vuex.Store({
  modules: {
    layers,
    view,
    UI
  },
  state,
  plugins
})

export default store
