const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const {
  createUser,
  getUserWithEmail,
  deleteUser,
  updateUser,
  getAllUsers,
} = require('../services/user')
const { decodeToken } = require('../middlewares/jwt')

module.exports = {
  list: catchAsync(async (req, res) => {
    const users = await getAllUsers()
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'User created',
      body: users,
    })
  }),
  post: catchAsync(async (req, res) => {
    const userToken = await createUser(req.body)
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'User created',
      body: { userToken },
    })
  }),
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body
    const { user, token } = await getUserWithEmail({ email, password })
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'User logged in',
      body: { user, token },
    })
  }),
  put: catchAsync(async (req, res) => {
    const user = await updateUser(req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'User updated',
      body: user,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteUser(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'User deleted',
    })
  }),
  userDataByToken: catchAsync(async (req, res) => {
    const user = decodeToken(req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'User retrieved successfully',
      body: user,
    })
  }),
}
