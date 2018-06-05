import Group from 'ol/layer/group'

import ign from './ign'
import bing from './bing'
import osm from './osm'

const layers = [
  new Group({
    title: 'Open Maps',
    layers: osm,
    visible: false,
  }),
  new Group({
    title: 'Bing maps',
    subtitle: '$',
    layers: bing,
    visible: false,
  }),
  new Group({
    'title': 'IGN maps',
    layers: ign,
    visible: true,
    openInLayerSwitcher: true
  }),
]

export default layers
