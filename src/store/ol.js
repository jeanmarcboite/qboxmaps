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
    options.view = new View(view.state)
    const target = options.target
    delete options.target
    state[target] = new Map(options)
  },
  setTarget(state, options) {
    state['map'].setTarget('map')
  },
  setCenter(state, options) {
    state[getName(state, options)].getView().setCenter(options.center)
  },
  addControl(state, options) {
    state[getName(state, options)].addControl(options.control)
  },
  addInteraction(state, options) {
    state[getName(state, options)].addInteraction(options.interaction)
  },
  removeInteraction(state, options) {
    state[getName(state, options)].removeInteraction(options.interaction)
  },
  pushTrack(state, options) {
    state[getName(state, options)].tracks.getLayers().push(options.track)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
