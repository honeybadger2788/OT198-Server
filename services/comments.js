const { Comment } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')
const { decodeToken } = require('../middlewares/jwt')

module.exports = {
  listComments: async () => {
    const comments = await Comment.findAll({
      attributes: ['body'],
      order: [['createdAt', 'DESC']],
    })
    return comments
  },
  updateComment: async (req) => {
    const comment = await Comment.findByPk(req.params.id)
    const user = decodeToken(req)
    if (!comment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
    }
    if (user.roleId !== 1 && user.id !== comment.userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }
    comment.body = req.body.body
    await comment.save()
    return comment
  },
}
