const router = require('express').Router()
const { list, update } = require('../controllers/comments')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateSchema } = require('../middlewares/validateErrors')
const commentSchema = require('../schemas/comment')

router.get('/', auth, isAdmin, list)

router.put('/:id', auth, validateSchema(commentSchema), update)

module.exports = router
