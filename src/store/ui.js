import { make } from 'vuex-pathify'

const state = {
  layerSwitcherOpen: false
}

const mutations = {
  ...make.mutations(state),
  closeDrawer(state) {
    state.layerSwitcherOpen = false
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
