const shortId = require('shortid')

const CHASQUI_URL = require('../constants/chasquiUrl')

function createChasquiUrl(id) {
  if(!id)
    id = shortId.generate()
  return CHASQUI_URL + "topic/" + id
}

module.exports = createChasquiUrl
