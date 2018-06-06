import ol from 'ol'
import VectorLayer from 'ol/layer/vector'
import Stroke from 'ol/style/stroke'
import Style from 'ol/style/style'

export function TrackLayer(optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof TrackLayer)) {
    console.warn('TrackLayer is a constructor and should be called with the `new` keyword')
  }
  this.color = optOptions.color || '#000000'

  const options = Object.assign({
    style: new Style({
      stroke: new Stroke({color: this.color, width: 4})
    })
  }, optOptions)

  VectorLayer.call(this, options)

  this.extent = options.source.getExtent().slice()
};

ol.inherits(TrackLayer, VectorLayer)

TrackLayer.prototype.getName = function(track) {
  return this.get('title')
}

TrackLayer.prototype.setColor = function(color) {
  this.color = color
  console.log('set color of ', this.getName(), ' to ', color)
  const style = new Style({
    stroke: new Stroke({color, width: 4})
  })
  this.setStyle(style)
}

export default TrackLayer
