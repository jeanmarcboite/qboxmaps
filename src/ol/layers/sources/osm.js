import Tile from 'ol/layer/tile'
import OSM from 'ol/source/osm'
const osm = new Tile({
  title: 'OSM',
  type: 'base',
  baseLayer: true,
  source: new OSM(),
  visible: true,
  noSwitcherDelete: true})

const osmLayers = [osm]
export default osmLayers
