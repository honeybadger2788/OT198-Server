const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { listOrganization, updateOrganization } = require('../services/organization')
const { listSlideByOrder } = require('../services/slide')
const httpStatus = require('../helpers/httpStatus')

// find all Organization function
module.exports = {
  list: catchAsync(async (req, res) => {
    const publicData = await listOrganization()
    const publicSlide = await listSlideByOrder()
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Organizations public data retrieved successfully',
      body: [publicData, publicSlide],
    })
  }),
  put: catchAsync(async (req, res) => {
    const updatedOrganization = await updateOrganization(1, req.body)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Organization updated',
      body: updatedOrganization,
    })
  }),
}
