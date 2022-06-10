const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const httpStatus = require('../helpers/httpStatus')
const {
  getNewById, createNew, updateNew, deleteNew,
} = require('../services/news')

module.exports = {
  listNews: catchAsync(async (req, res) => {
    const { id } = req.params
    if (id) {
      const result = await getNewById(id)
      endpointResponse({
        res,
        code: httpStatus.OK,
        status: true,
        message: 'successfully retrieved',
        body: result,
      })
    }
  }),
  post: catchAsync(async (req, res) => {
    const createdNew = await createNew(req.body)
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'New created',
      body: createdNew,
    })
  }),
  update: catchAsync(async (req, res) => {
    const { id } = req.params
    const data = req.body

    const updatedNew = await updateNew(id, data)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'New updated',
      body: updatedNew,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteNew(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'New deleted',
    })
  }),
}
