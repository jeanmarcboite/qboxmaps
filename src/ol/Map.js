import ol from 'ol'
import OlMap from 'ol/map'
import View from 'ol/view'
import TrackGroup from 'src/ol/layer/TrackGroup'
import dragAndDropInteraction from 'src/ol/interaction/dnd'
import layers from 'src/ol/layer/sources'
import interaction from 'ol/interaction'

export function Map(optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Map)) {
    console.warn('Map is a constructor and should be called with the `new` keyword')
  }

  this.timestamp = Date.now()

  const options = Object.assign({
    target: 'map',
    layers,
    interactions: interaction.defaults().extend([dragAndDropInteraction]),
  }, optOptions)

  this.tracks = new TrackGroup({
    tracks: options.tracks
  })
  layers.push(this.tracks)
  if (!options.view) {
    options.view = new View()
  }

  OlMap.call(this, options)
  this.on('click', function (event) {
    if (self.layerSwitcherOpen) { // avoid too many store mutations
      self.layerSwitcherOpen = false
    }
  })
}

ol.inherits(Map, OlMap)

Map.prototype.getName = function () {
  return this.target
}

export default Map
