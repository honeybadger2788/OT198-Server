const express = require('express')
const { get } = require('../controllers/index')
const pingRouter = require('./ping')
const categoriesRouter = require('./categories')
const newsRouter = require('./news')
const organizationRouter = require('./organization')
const authRouter = require('./auth')
const newRouter = require('./news')
const activitiesRouter = require('./activity')
const slidesRouter = require('./slide')
const userRouter = require('./user')
const testimonialRouter = require('./testimonial')
const contactsRouter = require('./contacts')
const commentsRouter = require('./comments')
const membersRouter = require('./members')
const swaggerRouter = require('./swagger')

const router = express.Router()

// Middlewares
const { auth } = require('../middlewares/auth')

router.get('/', get)
// example of a route with index controller get function
router.use('/ping', auth, pingRouter)

// categories routes
router.use('/categories', categoriesRouter)

router.use('/news', newsRouter)

// organization routes
router.use('/organization', organizationRouter)

// auth routes
router.use('/auth', authRouter)

// slides routes
router.use('/slides', slidesRouter)

// new routes
router.use('/new', newRouter)

// user routes
router.use('/users', userRouter)

// activity routes
router.use('/activities', activitiesRouter)

// user routes
router.use('/users', userRouter)
// contacts routes
router.use('/contacts', contactsRouter)

// testimonial routes
router.use('/testimonials', testimonialRouter)

// comments routes
router.use('/comments', commentsRouter)
// members routes
router.use('/members', membersRouter)
// swagger routes
router.use('/api/docs', swaggerRouter)

router.get('*', (req, res) => res.redirect('/api/docs'))
module.exports = router
