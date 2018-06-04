import DragAndDrop from 'ol/interaction/draganddrop'
import GPX from 'ol/format/gpx'
import GeoJSON from 'ol/format/geojson'
import IGC from 'ol/format/igc'
import KML from 'ol/format/kml'
import TopoJSON from 'ol/format/topojson'
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import styleFunction from 'src/ol/layers/style'

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
  var title = 'new layer'
  if (event.file) {
    title = event.file.name
  }
  const vectorSource = new VectorSource({
    features: event.features
  })
  event.target.map_.addLayer(new VectorLayer({
    title,
    source: vectorSource,
    style: styleFunction,
    displayInLayerSwitcher: true
  }))
  event.target.map_.getView().fit(vectorSource.getExtent())
})

export default dragAndDropInteraction
