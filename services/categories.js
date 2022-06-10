const { Category } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  listCategories: async () => {
    const categories = await Category.findAll({ attributes: ['name'] })
    return categories
  },
  listCategoryById: async (id) => {
    const category = await Category.findByPk(id)
    if (!category) throw new ApiError(404, 'Category not found')
    return category
  },
  updateCategory: async (categoryToEdit, id) => {
    const editCategory = await Category.update(categoryToEdit, {
      where: { id },
    })
    if (editCategory[0] !== 1) {
      throw new ApiError(httpStatus.NOT_FOUND, `Category with id ${id} not found`)
    }
    const updatedCategory = this.listCategoryById(id)
    return updatedCategory
  },
  createCategory: async (category) => {
    const newCategory = await Category.create(category)
    return newCategory
  },
  deleteCategory: async (id) => {
    const user = await Category.destroy({
      where: { id },
    })
    if (user !== 1) throw new ApiError(httpStatus.NOT_FOUND, `Category with id ${id} not found`)
    return user
  },
}
