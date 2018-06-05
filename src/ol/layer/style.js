import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import Style from 'ol/style/style'
import RegularShape from 'ol/style/regularshape'
import CircleStyle from 'ol/style/circle'

const defaultColor = '#f00'

export const profileStyle = [
  new Style({
    image: new RegularShape({
      radius: 10,
      radius2: 5,
      points: 5,
      fill: new Fill({color: 'red'})
    }),
    stroke: new Stroke({
      color: [
        0, 0, 255
      ],
      width: 2
    }),
    fill: new Fill({
      color: [0, 0, 255, 0.3]
    })
  })]

export const defaultStyle = {
  'Point': new Style({
    image: new RegularShape({
      radius: 10,
      radius2: 5,
      points: 8,
      fill: new Fill({color: 'red'})
    }),
    image2: new CircleStyle({
      fill: new Fill({color: 'rgba(255,255,0,0.5)'}),
      radius: 8,
      stroke: new Stroke({color: '#f0f', width: 1})
    })
  }),
  'LineString': new Style({
    stroke: new Stroke({color: '#f00', width: 3})
  }),
  'Polygon': new Style({
    fill: new Fill({color: 'rgba(0,255,255,0.5)'}),
    stroke: new Stroke({color: '#0ff', width: 1})
  }),
  'MultiPoint': new Style({
    image: new CircleStyle({
      fill: new Fill({color: 'rgba(255,0,255,0.5)'}),
      radius: 5,
      stroke: new Stroke({color: '#f0f', width: 1})
    })
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({color: defaultColor, width: 3})
  }),
  'MultiPolygon': new Style({
    fill: new Fill({color: 'rgba(0,0,255,0.5)'}),
    stroke: new Stroke({color: '#00f', width: 1})
  })
}

const styleFunction = function(feature, resolution) {
  const featureStyleFunction = feature.getStyleFunction()
  if (featureStyleFunction) {
    return featureStyleFunction.call(feature, resolution)
  } else {
    return defaultStyle[feature.getGeometry().getType()]
  }
}

export default styleFunction
