import Tile from 'ol/layer/tile'
import WMTS from 'ol/source/wmts'
import TileGridWMTS from 'ol/tilegrid/wmts'

// API key valid for 'openlayers.org' and 'localhost'.
// Expiration date is 06/29/2018.
// const key1 = '2mqbg0z6cx7ube8gsou10nrt'
// const key2 = '6w135ptdb0vpxhop3pjbhb23'
const key = '7w2fnww4mguagxhybm8l55gw'

var resolutions = [
  156543.03392804103,
  78271.5169640205,
  39135.75848201024,
  19567.879241005125,
  9783.939620502562,
  4891.969810251281,
  2445.9849051256406,
  1222.9924525628203,
  611.4962262814101,
  305.74811314070485,
  152.87405657035254,
  76.43702828517625,
  38.218514142588134,
  19.109257071294063,
  9.554628535647034,
  4.777314267823517,
  2.3886571339117584,
  1.1943285669558792,
  0.5971642834779396,
  0.29858214173896974,
  0.14929107086948493,
  0.07464553543474241
]

function ignSource(layer) {
  // 'ORTHOIMAGERY.ORTHOPHOTOS'
  return new WMTS({
    url: 'https://wxs.ign.fr/' + key + '/geoportail/wmts',
    layer,
    matrixSet: 'PM',
    format: 'image/jpeg',
    style: 'normal',
    tileGrid: new TileGridWMTS({
      origin: [
        -20037508, 20037508
      ], // topLeftCorner
      resolutions: resolutions, // résolutions
      matrixIds: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19'
      ] // ids des TileMatrix
    })
  })
}

export const ignGeo = new Tile({
  title: 'IGN Maps',
  type: 'base',
  baseLayer: true,
  source: ignSource('GEOGRAPHICALGRIDSYSTEMS.MAPS'),
  visible: false,
  noSwitcherDelete: true
})

export const ignPhotos = new Tile({
  title: 'IGN Photos',
  source: ignSource('ORTHOIMAGERY.ORTHOPHOTOS'),
  visible: false
})

const ignLayers = [ignGeo, ignPhotos]

export default ignLayers
