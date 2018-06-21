import ol from 'ol'
import Control from 'ol/control/control'
import {
  poi
} from 'src/ol/poi'
import store from 'src/store'

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-geolocator'] Class name.
 * @property {Element|string} [target] Specify a target if you want the control
 * to be rendered outside of the map's viewport.
 * @property {string|Element} [label='\u2316'] Text label to use for the button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Center map on geo location'] Text label to use for the button tip.
 */

/**
 * [description]
 * @param  {[type]} optOptions [description]
 * @return {[type]}            [description]
 */
const Geolocator = function (optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Geolocator)) {
    console.warn('Geolocator is a constructor and should be called with the `new` keyword')
  }
  const options = optOptions || {}
  const className = options.className || 'ol-geolocator'

  const label = options.label !== undefined ? options.label : '\u2316'
  const tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Set center to geolocation'

  const button = document.createElement('button')
  button.setAttribute('type', 'button')
  button.title = tipLabel
  button.appendChild(
    typeof label === 'string' ? document.createTextNode(label) : label
  )

  button.addEventListener('click', this.handleClick_, false)

  var element = document.createElement('div')
  element.className = className + ' ol-unselectable ol-control'
  element.appendChild(button)

  Control.call(this, {
    element: element,
    target: options.target
  })
}

ol.inherits(Geolocator, Control)

const setCenter = function (position) {
  const center = poi(position.coords.longitude, position.coords.latitude)
  store.commit('OL/setCenter', {
    center
  })
}
const error = function (err) {
  console.warn(`ERROR(${err.code}): ${err.message}`)
}
/**
 * @param {Event} event The event to handle
 * @private
 */
Geolocator.prototype.handleClick_ = function (event) {
  event.preventDefault()
  if ('geolocation' in navigator) {
    console.log('/* geolocation is available */')
    // One-shot position request.
    navigator.geolocation.getCurrentPosition(setCenter, error)
  }
}

/**
 * @protected
 */

export default Geolocator
