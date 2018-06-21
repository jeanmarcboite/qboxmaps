import POI from 'src/ol/poi'
import {
  make
} from 'vuex-pathify'

const state = {
  zoom: 16,
  center: POI.Faycelles,
  trackColor: '#0000ff'
}
const actions = {}

const getters = {
  defaultColor: state => state.trackColor,
}

// mutations - helper builds all commits
const mutations = {
  ...make.mutations(state),
  setView(state, value) {
    state.zoom = value.zoom
    state.center = value.center
  },
  setCenter(state, value) {
    state.center = value.center
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
