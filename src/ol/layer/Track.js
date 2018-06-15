import ol from 'ol'
import VectorLayer from 'ol/layer/vector'
import Stroke from 'ol/style/stroke'
import Style from 'ol/style/style'
import store from 'src/store'
import internalState from 'src/store/internal'

export function TrackLayer(optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof TrackLayer)) {
    console.warn('TrackLayer is a constructor and should be called with the `new` keyword')
  }
  this.id = internalState.nextID++
  this.color = optOptions.color || store.state.tracks.defaultColor
  this.width = optOptions.width || store.state.tracks.defaultWidth
  this.tags = optOptions.tags || []

  const options = Object.assign({
    style: new Style({
      stroke: new Stroke({color: this.color, width: this.width})
    })
  }, optOptions)

  VectorLayer.call(this, options)

  this.extent = options.source.getExtent().slice()
};

ol.inherits(TrackLayer, VectorLayer)

TrackLayer.prototype.getName = function() {
  return this.get('title')
}

TrackLayer.prototype.setColor = function(color) {
  this.color = color
  const style = new Style({
    stroke: new Stroke({color: this.color, width: this.width})
  })
  this.setStyle(style)
}

TrackLayer.prototype.setWidth = function(width) {
  this.width = width
  const style = new Style({
    stroke: new Stroke({color: this.color, width: this.width})
  })
  this.setStyle(style)
}

export default TrackLayer
