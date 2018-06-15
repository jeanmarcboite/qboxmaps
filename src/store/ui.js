import { make } from 'vuex-pathify'

const state = {
  layerSwitcherOpen: false,
}

const mutations = {
  ...make.mutations(state),
}

export default {
  namespaced: true,
  state,
  mutations
}
