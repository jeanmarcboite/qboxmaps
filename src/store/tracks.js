import Group from 'ol/layer/group'
import Track from 'src/ol/layer/Track'
import projection from 'src/ol/projection'
import GeoJSON from 'ol/format/geojson'
import {
  make
} from 'vuex-pathify'

const state = {
  defaultColor: '#ff0000',
  defaultWidth: 4,
  tracks: {},
  tagList: []
}

function storeFeatures(state, track) {
  const writer = new GeoJSON()
  const features = writer.writeFeatures(track.getSource().getFeatures(), projection)

  state.tracks[track.id] = {
    features,
    title: track.get('title'),
    timestamp: track.timestamp,
    color: track.color,
    width: track.width,
    tags: track.tags
  }
}

function storeTrack(state, track) {
  if (track instanceof Group) {
    storeTracks(state, track)
  } else {
    if (track instanceof Track) {
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
    const newState = Object.assign({
      tracks: {}
    }, state)
    storeTracks(newState, map)
    Object.assign(state, newState)
  },
  storeTrack(state, track) {
    storeTrack(state, track)
  },
  deleteTrack(state, track) {
    delete state.tracks[track.id]
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
