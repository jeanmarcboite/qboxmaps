import Group from 'ol/layer/group'
import VectorLayer from 'ol/layer/vector'
import projection from 'src/ol/projection'
import GeoJSON from 'ol/format/geojson'
import { make } from 'vuex-pathify'

const state = {
}

function storeFeatures(state, layer) {
  const writer = new GeoJSON()
  const features = writer.writeFeatures(layer.getSource().getFeatures(), projection)
  state[layer.get('title')] = features
}

function storeLayer(state, layer) {
  if (layer instanceof Group) {
    storeLayers(state, layer)
  } else {
    if (layer instanceof VectorLayer) {
      console.log('storeFeatures of ' + layer.getName())
      storeFeatures(state, layer)
    }
  }
}

function storeLayers(state, map) {
  map.getLayers().forEach(g => storeLayer(state, g))
}

const mutations = {
  ...make.mutations(state),
  addTrack(state, map) {
    const newState = {}
    storeLayers(newState, map)
    Object.assign(state, newState)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
