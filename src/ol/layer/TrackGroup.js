import ol from 'ol'
import Group from 'ol/layer/group'
import GeoJSON from 'ol/format/geojson'
import VectorSource from 'ol/source/vector'
import TrackLayer from 'src/ol/layer/Track'
import projection from 'src/ol/projection'
import internalState from 'src/store/internal'

export function TrackGroupLayer(optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof TrackGroupLayer)) {
    console.warn('TrackGroupLayer is a constructor and should be called with the `new` keyword')
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

ol.inherits(TrackGroupLayer, Group)

TrackLayer.prototype.getName = function () {
  return this.get('title')
}

TrackGroupLayer.prototype.addTrack = function (track, title) {
  console.log(track.get('title'))
  const format = new GeoJSON()
  const features = format.readFeatures(track.features, projection)
  const source = new VectorSource({ features })
  const trackLayer = new TrackLayer({
    title,
    source,
    color: track.color,
    width: track.width,
    tags: track.tags
  })
  this.getLayers().push(trackLayer)
}

TrackGroupLayer.prototype.addTracks = function (tracks) {
  for (var track in tracks) {
    if (tracks.hasOwnProperty(track)) {
      this.addTrack(tracks[track], track)
    }
  }
}

export default TrackGroupLayer
