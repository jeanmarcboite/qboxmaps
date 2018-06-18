import ol from 'ol'
import Group from 'ol/layer/group'
import GeoJSON from 'ol/format/geojson'
import VectorSource from 'ol/source/vector'
import Track from 'src/ol/layer/Track'
import projection from 'src/ol/projection'
import store from 'src/store'
import internalState from 'src/store/internal'

export function TrackGroup(optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof TrackGroup)) {
    console.warn('TrackGroup is a constructor and should be called with the `new` keyword')
  }

  const options = Object.assign({
    title: 'Tracks',
    visible: true,
    layers: [],
    type: 'track',
  }, optOptions)
  this.id = internalState.nextID++

    Group.call(this, options)

  this.addTracks(optOptions.tracks)
}

ol.inherits(TrackGroup, Group)

TrackGroup.prototype.getName = function () {
  return this.get('title')
}

TrackGroup.prototype.addTrack = function (track) {
  const format = new GeoJSON()
  const features = format.readFeatures(track.features, projection)
  const source = new VectorSource({
    features
  })
  const newTrack = new Track({
    ...track,
    source,
  })

  this.getLayers().push(newTrack)
}

TrackGroup.prototype.addTracks = function (tracks) {
  for (var track in tracks) {
    if (tracks.hasOwnProperty(track)) {
      this.addTrack(tracks[track])
    }
  }
}

TrackGroup.prototype.delete = function (track) {
  const items = []
  this.getLayers().forEach(function (item) {
    if (item.timestamp === track.timestamp) {
      items.push(item)
    }
  })

  items.forEach(item => {
    this.getLayers().remove(item)
  })

  store.commit('tracks/delete', track)
}

TrackGroup.prototype.clear = function () {
  this.getLayers().clear()

  store.commit('tracks/clear')
}
export default TrackGroup
