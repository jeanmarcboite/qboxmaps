import Group from 'ol/layer/group'
import Tile from 'ol/layer/tile'

const listLayers_ = function(group, layers) {
  group.getLayers().forEach(layer => listLayer(layer, layers))
}

const listLayer = function(layer, layers) {
  if (layer instanceof Group) {
    listLayers_(layer, layers)
  } else if (layer instanceof Tile) {
    layers.push(layer)
  }
}

const listLayers = function(group) {
  const layerList = []
  listLayers_(group, layerList)

  return layerList
}

export default listLayers
