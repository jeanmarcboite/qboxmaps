import Map from 'src/ol/Map'
import view from './view'
import View from 'ol/view'

const state = {
  defaultTarget: undefined,
  map: null
}

const getTarget = function (state, options) {
  if (options && options.target) {
    return options.target
  }
  return state.defaultTarget
}

const mutations = {
  newMap(state, options) {
    options.view = new View(view.state)
    const target = options.target
    delete options.target
    state[target] = new Map(options)
    if (!state.defaultTarget) {
      state.defaultTarget = target
    }
  },
  setTarget(state, options) {
    state[options.target].setTarget(options.target)
  },
  setCenter(state, options) {
    state[getTarget(state, options)].getView().setCenter(options.center)
  },
  addControl(state, options) {
    state[getTarget(state, options)].addControl(options.control)
  },
  addInteraction(state, options) {
    state[getTarget(state, options)].addInteraction(options.interaction)
  },
  removeInteraction(state, options) {
    state[getTarget(state, options)].removeInteraction(options.interaction)
  },
  pushTrack(state, options) {
    state[getTarget(state, options)].tracks.getLayers().push(options.track)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
