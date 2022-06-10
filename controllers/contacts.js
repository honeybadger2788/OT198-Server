const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { listAllContacts, createContact } = require('../services/contacts')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  list: catchAsync(async (req, res) => {
    const contacts = await listAllContacts()
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Contacts listed',
      body: contacts,
    })
  }),
  post: catchAsync(async (req, res) => {
    const createdContact = await createContact(req.body)
    endpointResponse({
      res,
      code: 201,
      status: true,
      message: 'Contact created',
      body: createdContact,
    })
  }),
}
