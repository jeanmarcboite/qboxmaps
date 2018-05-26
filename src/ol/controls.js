import Fullscreen from 'ol/control/fullscreen'
import control from 'ol/control'
import Scaleline from 'ol/control/scaleline'
import OverviewMap from 'ol/control/overviewmap'
import LayerSwitcher from 'ol-layerswitcher'

const controls = control.defaults().extend([
        new Fullscreen(),
        new Scaleline(),
        new OverviewMap(),
        new LayerSwitcher()
      ])

export default controls
