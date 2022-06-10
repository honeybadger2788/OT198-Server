const { Activity } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  listActivity: async () => {
    const activities = await Activity.findAll()
    return activities
  },
  postActivity: async (activity) => {
    const newActivity = await Activity.create(activity)
    return newActivity
  },
  updateActivity: async (activity, id) => {
    const editActivity = await Activity.update(activity, {
      where: { id },
    })
    if (editActivity[0] !== 1) throw new ApiError(httpStatus.NOT_FOUND, `Activity ${id} not found`)
    const activityUpdated = await Activity.findByPk(id)
    return activityUpdated
  },
}
