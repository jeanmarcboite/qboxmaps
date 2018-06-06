import GPX from 'ol/format/gpx'
import VectorSource from 'ol/source/vector'
import style from './style'

import TrackLayer from 'src/ol/layer/Track'
import projection from 'src/ol/projection'
const readFeatures = function(event, options) {
  const format = new GPX()
  const features = format.readFeatures(event.target.result, projection)
  const source = new VectorSource({features})
  options.map.addLayer(new TrackLayer({title: options.title, source, style}))
  if (options.fit) {
    options.map.getView().fit(source.getExtent())
  }
  options.store.commit('addTrack', options.map)
}
const readFeaturesOnLoad = (options) => (event) => readFeatures(event, options)

const readFeaturesFiles = function(event, options) {
  for (let file of event.target.files) {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = readFeaturesOnLoad({
      ...options,
      title: file.name,
      file,
      fit: event.target.files.length === 1
    })
  }
}
const readFiles = (options) => (event) => readFeaturesFiles(event, options)

export default readFiles
