import POI from 'src/assets/poi'

const state = {
  zoom: 16,
  center: POI.Faycelles,
  trackColor: '#0000ff'
}
const actions = {
}

const getters = {
  defaultColor: state => state.trackColor,
}

const mutations = {
  setView(state, value) {
    state.zoom = value.zoom
    state.center = value.center
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
