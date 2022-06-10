const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../services/testimonial')

module.exports = {
  post: catchAsync(async (req, res) => {
    const testimonialCreated = await createTestimonial(req)
    return endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'Testimonial created successfully',
      body: testimonialCreated,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteTestimonial(id)
    return endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Testimonial deleted successfully',
    })
  }),
  update: catchAsync(async (req, res) => {
    const { id } = req.params
    const { name, content, image } = req.body
    const updatedTestimonial = await updateTestimonial(
      {
        id,
        name,
        content,
        image,
      },
      req,
    )
    return endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Testimonial updated successfully',
      body: updatedTestimonial,
    })
  }),
}
