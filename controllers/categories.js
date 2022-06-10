const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const {
  listCategories,
  listCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
} = require('../services/categories')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  list: catchAsync(async (req, res) => {
    const categories = await listCategories()
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Categories found',
      body: categories,
    })
  }),
  listCategory: catchAsync(async (req, res) => {
    const { id } = req.params
    const response = await listCategoryById(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Categories found',
      body: response,
    })
  }),
  update: catchAsync(async (req, res) => {
    const { name, description, image } = req.body
    const updatedCategory = await updateCategory({ name, description, image }, req.params.id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      message: 'Category updated',
      body: updatedCategory,
    })
  }),
  post: catchAsync(async (req, res) => {
    const { name, description, image } = req.body
    const category = await createCategory({ name, description, image })
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'Category created',
      body: category,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteCategory(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Category deleted',
    })
  }),
}
