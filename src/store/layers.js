const state = {
  tiles: {
    osm: {
      visible: false,
      layers: {
        osm: {
          visible: true
        }
      }
    },
    ign: {
      visible: true,
      layers: {
        geo: {
          visible: true
        },
        photos: {
          visible: false
        }
      }
    },
    bing: {
      visible: false,
      layers: {
        road: {
          visible: false
        },
        imagery: {
          visible: false
        }
      }
    }
  },
  tracks: {}
}

const getters = {}

const mutations = {}

export default {state, getters, mutations}
