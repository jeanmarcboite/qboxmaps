import Map from 'src/ol/Map'
import view from './view'
import View from 'ol/view'

const state = {
  defaultMap: 'map',
  map: null
}

const getName = function (state, options) {
  if (options && options.name) {
    return options.name
  }
  return state.defaultMap
}

const mutations = {
  newMap(state, options) {
    console.log('new map: ', options.name)
    options.view = new View(view.state)
    state[options.name] = new Map(options)
  },
  setTarget(state, options) {
    console.log('setTarget ' + getName(state, options))
    state[getName(state, options)].setTarget(options.target)
  },
  setCenter(state, options) {
    state[getName(state, options)].getView().setCenter(options.center)
  },
  addControl(state, options) {
    console.log('addControl ' + name)
    state[getName(state, options)].addControl(options.control)
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
