const express = require('express')

const router = new express.Router()

const { validateSchema } = require('../middlewares/validateErrors')
const newSchema = require('../schemas/newSchema')
const {
  post, listNews, update, destroy,
} = require('../controllers/news')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

router.get('/:id', listNews)
router.post('/', auth, isAdmin, validateSchema(newSchema), post)
router.put('/:id', validateSchema(newSchema), update)
router.delete('/:id', auth, isAdmin, destroy)

module.exports = router
