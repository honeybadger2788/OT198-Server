const bcrypt = require('bcrypt')
const { User } = require('../database/models')
const { sendWelcomeEmail } = require('./sendgrid')
const ApiError = require('../helpers/ApiError')
const { generateToken } = require('../middlewares/jwt')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  createUser: async (data) => {
    const {
      firstName, lastName, email, password,
    } = data
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12),
      },
    })
    if (!created) throw new ApiError(409, 'Email already exists')
    await sendWelcomeEmail(email)
    const token = generateToken(user.dataValues)
    return token
  },
  getAllUsers: async () => {
    const users = await User.findAll()
    return users
  },
  getUserWithEmail: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } })
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
    }
    const token = generateToken(user.dataValues)
    return { user, token }
  },
  updateUser: async (req) => {
    const {
      firstName, lastName, email, password,
    } = req.body
    const idUser = req.params.id
    const userExist = await User.findOne({ where: { id: idUser } })
    if (!userExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    const result = await User.update(
      {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12),
      },
      {
        where: { id: idUser },
      },
    )
    return result
  },
  deleteUser: async (id) => {
    const user = await User.destroy({
      where: { id },
    })
    if (user !== 1) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  },
}
