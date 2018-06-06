import GeoJSON from 'ol/format/geojson'
import VectorSource from 'ol/source/vector'
import style from './style'
import TrackLayer from 'src/ol/layer/Track'
import projection from 'src/ol/projection'

const addLayer = function (options) {
  const format = new GeoJSON()
  const features = format.readFeatures(options.features, projection)
  const source = new VectorSource({features})
  options.map.$tracks.getLayers().push(new TrackLayer({title: options.title, source, style}))
}

const addTracks = function(map, tracks) {
  for (var track in tracks) {
    if (tracks.hasOwnProperty(track)) {
      addLayer({map, features: tracks[track], title: track})
    }
  }
}
export default addTracks
