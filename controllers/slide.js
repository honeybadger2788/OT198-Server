const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  listSlide,
  listSlideById,
  updateSlide,
  createSlide,
  deleteSlide,
} = require('../services/slide')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  list: catchAsync(async (req, res) => {
    const publicData = await listSlide()
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Slides public data retrieved successfully',
      body: publicData,
    })
  }),
  listById: catchAsync(async (req, res) => {
    const { id } = req.params
    const slide = await listSlideById(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Slide found',
      body: slide,
    })
  }),
  update: catchAsync(async (req, res) => {
    const { id } = req.params
    const {
      text, order, organizationId, imageURL,
    } = req.body
    const updatedSlide = await updateSlide(
      id,
      {
        text,
        order,
        imageURL,
        organizationId,
      },
      req,
    )
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Slide updated',
      body: updatedSlide,
    })
  }),
  post: catchAsync(async (req, res) => {
    const slide = await createSlide(req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Slide created',
      body: slide,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    const status = await deleteSlide(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status,
      message: 'Slide deleted',
    })
  }),
}
