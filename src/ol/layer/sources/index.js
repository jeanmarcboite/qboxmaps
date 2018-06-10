import Group from 'ol/layer/group'

import ign from './ign'
import bing from './bing'
import osm from './osm'

const layers = [
  new Group({
    title: 'Open Maps',
    layers: osm,
    visible: false,
    type: 'map'
  }),
  new Group({
    title: 'Bing maps',
    subtitle: '$',
    layers: bing,
    visible: false,
    type: 'map',
    Layer: true
  }),
  new Group({
    'title': 'IGN maps',
    layers: ign,
    visible: true,
    openInLayerSwitcher: true,
    type: 'map',
    Layer: true
  }),
]

export default layers
