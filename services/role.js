const { Roles } = require('../database/models')

module.exports = {
  listRoles: async () => {
    const allRoles = await Roles.findAll()
    return allRoles
  },
}
