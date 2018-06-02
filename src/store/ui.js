import { make } from 'vuex-pathify'

const state = {
  layerSwitcherOpen: false
}

export default {
  namespaced: true,
  state,
  mutations: make.mutations(state)
}
