import { make } from 'vuex-pathify'

const state = {
  layerSwitcherOpen: false,
  trackSwitcherOpen: false,
  tlg: null
}

const mutations = {
  ...make.mutations(state),
  closeDrawer(state) {
    state.layerSwitcherOpen = false
    state.trackSwitcherOpen = false
  },
  updateTLG(state) {
    console.log('update TLG')
    state.tlg.$forceUpdate()
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
