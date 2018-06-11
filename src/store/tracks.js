import Group from 'ol/layer/group'
import VectorLayer from 'ol/layer/vector'
import projection from 'src/ol/projection'
import GeoJSON from 'ol/format/geojson'
import { make } from 'vuex-pathify'
import store from 'src/store'

const state = {
  defaultColor: '#ff0000',
  defaultWidth: 4,
  tracks: {},
  tagList: []
}

function storeFeatures(state, track) {
  const writer = new GeoJSON()
  const features = writer.writeFeatures(track.getSource().getFeatures(), projection)

  state.tracks[track.get('title')] = {
    features,
    color: track.color,
    width: track.width,
    tags: track.tags
  }
}

function storeTrack(state, track) {
  if (track instanceof Group) {
    storeTracks(state, track)
  } else {
    if (track instanceof VectorLayer) {
      storeFeatures(state, track)
    }
  }
}

function storeTracks(state, map) {
  map.getLayers().forEach(g => storeTrack(state, g))
}

const mutations = {
  ...make.mutations(state),
  storeTracks(state, map) {
    const newState = Object.assign({tracks: {}}, state)
    storeTracks(newState, map)
    Object.assign(state, newState)
    store.commit('UI/updateTrackList')
  }
}

const getters = {
  inTracks: (state) => (track) => {
    return (track in state.tracks)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
