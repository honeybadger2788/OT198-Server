const router = require('express').Router()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger')

const specs = swaggerJsdoc(swaggerDocument)
router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(specs))
module.exports = router
