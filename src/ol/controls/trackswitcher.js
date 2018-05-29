import Button from './button'
import Group from 'ol/layer/group'
import VectorLayer from 'ol/layer/vector'

export default class TrackSwitcher extends Button {
  constructor(optOptions = {}) {
    const options = optOptions || {}
    const className = options.className || 'ol-trackswitcher'
    const label = options.label !== undefined
      ? options.label
      : '\u2933'
    const tipLabel = options.tipLabel !== undefined
      ? options.tipLabel
      : 'Tracks'

    super({
      ...options,
      className,
      label,
      tipLabel
    })

    this.hiddenClassName = 'ol-unselectable ol-control ol-trackswitcher'
    this.shownClassName = 'shown'

    this.element.className = this.hiddenClassName
    this.panel = document.createElement('div')
    this.panel.className = 'panel'
    this.element.appendChild(this.panel)
  }

  handleClick(event) {
    this.this.showPanel()
    event.preventDefault()
  }
  showPanel() {
    if (!this.element.classList.contains(this.shownClassName)) {
      this.element.classList.add(this.shownClassName)
      this.renderPanel()
    }
  }

  /**
    * Hide the layer panel.
    */
  hidePanel() {
    if (this.element.classList.contains(this.shownClassName)) {
      this.element.classList.remove(this.shownClassName)
    }
  }

  renderPanel() {
    while (this.panel.firstChild) {
      this.panel.removeChild(this.panel.firstChild)
    }
    const title = document.createElement('h5')
    title.appendChild(document.createTextNode('Tracks'))
    this.panel.appendChild(title)
    const ul = document.createElement('ul')
    this.panel.appendChild(ul)
    this.listLayers(this.getMap(), ul)
  }

  listLayers(group, ul) {
    group.getLayers().forEach(layer => this.listLayer(layer, ul))
  }

  listLayer(layer, ul) {
    if (layer instanceof Group) {
      this.listLayers(layer, ul)
    } else if (layer instanceof VectorLayer && layer.extent) {
      ul.appendChild(this.liLayer(layer))
    }
  }

  liLayer(layer) {
    const this_ = this
    const li = document.createElement('li')
    li.className = 'layer'
    const input = document.createElement('input')
    input.type = 'radio'
    input.name = 'baseTrack'
    input.onchange = function(e) {
      if (e.target.checked && layer.extent) {
        this_.getMap().getView().fit(layer.extent)
      }
    }
    const layerId = TrackSwitcher.uuid()
    input.id = layerId
    li.appendChild(input)
    const label = document.createElement('label')
    label.htmlFor = layerId
    label.innerHTML = layer.get('title')
    li.appendChild(label)

    return li
  }

  /**
      * **Static** Generate a UUID
      * Adapted from http://stackoverflow.com/a/2117523/526860
      * @returns {String} UUID
      */
  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0
      let v = c === 'x'
        ? r
        : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}

/** Test if a layer should be displayed in the switcher
   * @param {ol.layer} layer
   * @return {boolean} true if the layer is displayed
   */
TrackSwitcher.prototype.displayInLayerSwitcher = function(layer) {
  return true || (layer.get('displayInLayerSwitcher') !== false)
}
