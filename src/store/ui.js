import { make } from 'vuex-pathify'

const state = {
  layerSwitcherOpen: false,
  trackSwitcherOpen: false
}

const mutations = {
  ...make.mutations(state),
  closeDrawer(state) {
    state.layerSwitcherOpen = false
    state.trackSwitcherOpen = false
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
