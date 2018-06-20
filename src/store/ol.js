import Map from 'src/ol/Map'
import view from './view'
import View from 'ol/view'

const state = {
  map: null
}

const mutations = {
  newMap(state, options) {
    console.log('new map: ', options.name)
    options.view = new View(view.state)
    state[options.name] = new Map(options)
  },
  setTarget(state, name) {
    console.log('setTarget ' + name)
    state[name].setTarget(name)
  },
  addControl(state, name, control) {
    state[name].addControl(control)
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
