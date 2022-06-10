const basicInfo = require('./basicInfo')
const server = require('./server')

module.exports = {
  definition: {
    ...basicInfo,
    ...server,
  },
  apis: ['./routes/*.js'],
}
