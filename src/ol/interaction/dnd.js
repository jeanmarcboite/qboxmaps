import DragAndDrop from 'ol/interaction/draganddrop'
import GPX from 'ol/format/gpx'
import GeoJSON from 'ol/format/geojson'
import IGC from 'ol/format/igc'
import KML from 'ol/format/kml'
import TopoJSON from 'ol/format/topojson'
import TrackLayer from 'src/ol/layer/Track'
import VectorSource from 'ol/source/vector'
import styleFunction from 'src/ol/layer/style'
import store from 'src/store'

const dragAndDropInteraction = new DragAndDrop({
  formatConstructors: [
    GPX,
    GeoJSON,
    IGC,
    KML,
    TopoJSON
  ]
})
dragAndDropInteraction.on('addfeatures', function(event) {
  const map = event.target.map_
  var title = 'new layer'
  if (event.file) {
    title = event.file.name
  }
  const vectorSource = new VectorSource({
    features: event.features
  })
  map.$tracks.getLayers().push(new TrackLayer({
    title,
    source: vectorSource,
    style: styleFunction,
    displayInLayerSwitcher: true
  }))
  map.getView().fit(vectorSource.getExtent())

  store.commit('tracks/store', map)
})

export default dragAndDropInteraction
