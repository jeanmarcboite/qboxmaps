import proj from 'ol/proj'
import projection from './projection'

const poi = function(lon, lat) {
  return proj.transform([lon, lat],
    projection.dataProjection,
    projection.featureProjection)
}

export default {
  Faycelles: poi(1.987147, 44.565865),
  Paris: poi(2.351828, 48.856578),
  London: poi(-0.1275, 51.507222),
  Geneve: poi(0.149985, 46.200013),
  Bruxelles: poi(4.35, 50.83),
  Berlin: poi(3.383333, 52.516667),
  Madrid: poi(-3.683333, 40.433333),
  Roma: poi(12.48657, 41.888732),
}
