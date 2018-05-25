import Group from 'ol/layer/group'

import ign from './ign'
import bing from './bing'
import osm from './osm'

const layers = [
  new Group({
    title: 'Bing maps',
    layers: bing,
    visible: true,
  }),
  new Group({
    'title': 'IGN maps',
    layers: ign,
    visible: true,
    openInLayerSwitcher: true
  }),
  new Group({
    title: 'Open Maps',
    layers: osm,
    visible: true,
  })
]

export default layers
