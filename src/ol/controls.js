import Fullscreen from 'ol/control/fullscreen'
import control from 'ol/control'

const controls = control.defaults().extend([
        new Fullscreen()
      ])

export default controls
