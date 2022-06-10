const db = require('../database/models')

const { Category } = db
// todo - create a error handler
const listCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id)
    return category
      ? {
        code: 200,
        status: true,
        message: 'Category found',
        body: category,
      }
      : { code: 404, status: false, message: `Category with id ${id} not found` }
  } catch (error) {
    throw new Error(error)
  }
}

const listCategories = async (page) => {
  const allCategories = await Category.findAndCountAll({
    attributes: ['name'],
    limit: 10,
    offset: 10 * (page - 1),
    order: [['createdAt', 'DESC']],
  })
  return allCategories
}

const upDateCategory = async (categoryToEdit, id) => {
  try {
    const editCategory = await Category.update(categoryToEdit, {
      where: { id },
    })
    return editCategory[0] === 1
      ? { code: 200, status: true, message: 'Category edited' }
      : { code: 404, status: false, message: `Category ${id} not found` }
  } catch (error) {
    throw new Error(error)
  }
}

const createCategory = async (category) => {
  try {
    const newCategory = await Category.create(category)
    return newCategory
  } catch (error) {
    throw new Error(error)
  }
}

const deleteCategory = async (id) => {
  try {
    const user = await Category.destroy({
      where: { id },
    })
    return user === 1
      ? { code: 200, status: true, message: 'Category deleted' }
      : { code: 404, status: false, message: `Category with id ${id} not found` }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  listCategories,
  listCategoryById,
  upDateCategory,
  createCategory,
  deleteCategory,
}
