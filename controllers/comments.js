const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { listComments, updateComment } = require('../services/comments')

module.exports = {
  list: catchAsync(async (req, res) => {
    const comments = await listComments()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Comments listed',
      body: comments,
    })
  }),
  update: catchAsync(async (req, res) => {
    const updatedComment = await updateComment(req)
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Comment updated',
      body: updatedComment,
    })
  }),
}
