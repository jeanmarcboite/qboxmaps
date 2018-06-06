import ol from 'ol'
import VectorLayer from 'ol/layer/vector'
import Stroke from 'ol/style/stroke'
import Style from 'ol/style/style'

export function TrackLayer(optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof TrackLayer)) {
    console.warn('Toolbar is a constructor and should be called with the `new` keyword')
  }

  const options = Object.assign({}, optOptions)

  VectorLayer.call(this, options)

  this.color = '#000000'
  this.extent = options.source.getExtent().slice()
};

ol.inherits(TrackLayer, VectorLayer)

TrackLayer.prototype.getName = function(track) {
  return this.get('title')
}

TrackLayer.prototype.setColor = function(color) {
  this.color = color
  const style = new Style({
    stroke: new Stroke({color, width: 4})
  })
  this.setStyle(style)
}

export default TrackLayer
