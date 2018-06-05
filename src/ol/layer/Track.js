import ol from 'ol'
import VectorLayer from 'ol/layer/vector'

export function TrackLayer (optOptions) {
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

export default TrackLayer
