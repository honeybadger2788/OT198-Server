const createHttpError = require('http-errors')
const httpStatus = require('../helpers/httpStatus')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { calculatePagination } = require('../utils/pagination')
const {
  listCategories,
  listCategoryById,
  upDateCategory,
  createCategory,
  deleteCategory,
} = require('../services/categories')

const list = catchAsync(async (req, res) => {
  const resource = req.baseUrl
  req.query.page = req.query.page || 1
  const categories = await listCategories(req.query.page)
  endpointResponse({
    res,
    code: httpStatus.OK,
    status: true,
    message: 'Categories successfully retrieved',
    body: {
      ...calculatePagination(req.query.page, categories.count, resource),
      categories: categories.rows,
    },
  })
})

const listCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await listCategoryById(id)
    endpointResponse({
      res,
      ...response,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [listCategory with ID - GET]: ${error.message}`,
    )
    next(httpError)
  }
}
const update = async (req, res, next) => {
  try {
    const { name, description, image } = req.body
    const response = await upDateCategory({ name, description, image }, req.params.id)
    endpointResponse({
      res,
      ...response,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [Edit Category - PUT]: ${error.message}`,
    )
    next(httpError)
  }
}

const post = async (req, res, next) => {
  try {
    const { name, description, image } = req.body
    const category = await createCategory({ name, description, image })
    endpointResponse({
      res,
      code: 201,
      status: true,
      message: 'Category created',
      body: category,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [create Category - POST]: ${error.message}`,
    )
    next(httpError)
  }
}

const destroy = async (req, res, next) => {
  const { id } = req.params
  try {
    const { code, status, message } = await deleteCategory(id)
    endpointResponse({
      res,
      code,
      status,
      message,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [delete Category - DELETE]: ${error.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  list,
  listCategory,
  update,
  post,
  destroy,
}
