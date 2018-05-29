import ol from 'ol'
import Control from 'ol/control/control'

/**
 * @typedef {Object} Options
 * @property {string} [className='ol-Button'] Class name.
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
const Button = function(optOptions) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Button)) {
    console.warn('Button is a constructor and should be called with the `new` keyword')
  }
  const options = optOptions || {}
  const className = options.className || 'ol-newbutton'

  const label = options.label !== undefined ? options.label : '\u2933'
  const tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Set center to geolocation'

  const button = document.createElement('button')
  button.this = this
  button.setAttribute('type', 'button')
  button.title = tipLabel
  button.appendChild(
    typeof label === 'string' ? document.createTextNode(label) : label
  )

  button.addEventListener('click', this.handleClick, false)

  var element = document.createElement('div')
  element.className = className + ' ol-unselectable ol-control'
  element.appendChild(button)

  Control.call(this, {
    element: element,
    target: options.target
  })
}

ol.inherits(Button, Control)

export default Button
