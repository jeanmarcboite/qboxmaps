import { make } from 'vuex-pathify'

const state = {
  layerSwitcherOpen: false,
  trackList: null
}

const mutations = {
  ...make.mutations(state),
  updateTrackList(state) {
    console.log('trackList.$forceUpdate()')
    state.trackList.$forceUpdate()
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
