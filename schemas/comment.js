const { body } = require('express-validator')

const commentSchema = [body('body').isString().withMessage('must be a string').trim()]

module.exports = commentSchema
