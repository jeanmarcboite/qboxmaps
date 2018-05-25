import Fullscreen from 'ol/control/fullscreen'
import control from 'ol/control'
import Scaleline from 'ol/control/scaleline'

const controls = control.defaults().extend([
        new Fullscreen(),
        new Scaleline()
      ])

export default controls
