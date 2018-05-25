import Fullscreen from 'ol/control/fullscreen'
import control from 'ol/control'
import Scaleline from 'ol/control/scaleline'
import OverviewMap from 'ol/control/overviewmap'

const controls = control.defaults().extend([
        new Fullscreen(),
        new Scaleline(),
        new OverviewMap()
      ])

export default controls
