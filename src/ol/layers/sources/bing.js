import Tile from 'ol/layer/tile'
import BingMaps from 'ol/source/bingmaps'
// jeanmarcboite@gmail.com for localhost
const key = 'At70LhIzqlj9R8t_QNprh9scHr6d-6MrPeqtim9vsvKHnEJC4fJzDRsaxgSDwL0i'

export const bingRoad = new Tile({
  title: 'Bing Road',
  baseLayer: true,
  visible: false,
  source: new BingMaps({key, imagerySet: 'Road'})
})

export const bingImagery = new Tile({
  title: 'Bing Aerial',
  visible: false,
  source: new BingMaps({key, imagerySet: 'Aerial'})
})

const bingLayers = [bingRoad, bingImagery]

export default bingLayers
