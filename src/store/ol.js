import Map from 'src/ol/Map'

const state = {
  map: null,
}

const mutations = {
  newMap(state, options) {
    console.log('new map: ', options.target)
    state[options.target] = new Map(options)
  },
  setTarget(state, name) {
    state[name].setTarget(name)
  },
  addInteraction(state, name, interaction) {
    state[name].addInteraction(interaction)
  },
  removeInteraction(state, name, interaction) {
    state[name].removeInteraction(interaction)
  },
  pushTrack(state, name, track) {
    state[name].tracks.getLayers().push(track)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
