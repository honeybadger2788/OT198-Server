const { endpointResponse } = require('../helpers/success')
const { listRoles } = require('../services/role')
const { catchAsync } = require('../helpers/catchAsync')
const httpStatus = require('../helpers/httpStatus')

module.export = {
  list: catchAsync(async (req, res) => {
    const roles = await listRoles()
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: roles,
    })
  }),
}
