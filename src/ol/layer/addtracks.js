import GeoJSON from 'ol/format/geojson'
import VectorSource from 'ol/source/vector'
import TrackLayer from 'src/ol/layer/Track'
import projection from 'src/ol/projection'

const addLayer = function (options) {
  const format = new GeoJSON()
  const features = format.readFeatures(options.track.features, projection)
  const source = new VectorSource({features})
  const track = new TrackLayer({title: options.title, source, color: options.track.color})
  options.map.$tracks.getLayers().push(track)
}

const addTracks = function(map, tracks) {
  for (var track in tracks) {
    if (tracks.hasOwnProperty(track)) {
      addLayer({map, track: tracks[track], title: track})
    }
  }
}
export default addTracks
