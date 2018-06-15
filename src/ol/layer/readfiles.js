import GPX from 'ol/format/gpx'
import VectorSource from 'ol/source/vector'
import store from 'src/store'

import Track from 'src/ol/layer/Track'
import projection from 'src/ol/projection'
const readFeatures = function(event, options) {
  const format = new GPX()
  const features = format.readFeatures(event.target.result, projection)
  const source = new VectorSource({features})

  const track = new Track({title: options.title, source})

  // remove track if already exists
  const items = []
  options.tracks.getLayers().forEach(function(item) {
    if (item.get('title') === options.title) {
      items.push(item)
    }
  })
  items.forEach(item => { options.tracks.getLayers().remove(item) })

  options.tracks.getLayers().push(track)
  if (options.fit) {
    options.map.getView().fit(source.getExtent())
  }

  store.commit('tracks/storeTrack', track)
}
const readFeaturesOnLoad = (options) => (event) => readFeatures(event, options)

const readFeaturesFile = function(file, options) {
  const reader = new FileReader()
  reader.readAsText(file, 'UTF-8')
  reader.onload = readFeaturesOnLoad({
    ...options,
    title: file.name,
    file
  })
}

const readFeaturesFiles = function(event, options) {
  const fit = event.target.files.length === 1
  for (let file of event.target.files) {
    if (!store.getters['tracks/inTracks'](file.name)) {
      readFeaturesFile(file, {
                ...options,
                fit
              })
    } else {
      options.notify({
        message: file.name + ' already exists',
        type: 'negative',
        timeout: 0,
        position: 'top-right',
        actions: [
          {
            label: 'Cancel',
            handler: () => {
              console.log('canceled')
            }
          }, {
            label: 'Overwrite',
            handler: () => {
              readFeaturesFile(file, {
                ...options,
                fit
              })
            }
          }
        ]
      })
    }
  }
}
const readFiles = (options) => (event) => readFeaturesFiles(event, options)

export default readFiles
