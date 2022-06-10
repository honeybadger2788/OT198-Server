const db = require('../database/models')
const { sendContactEmail } = require('./sendgrid')

const { Contact } = db

module.exports = {
  listAllContacts: async () => {
    const contacts = await Contact.findAll()
    return contacts
  },
  createContact: async (body) => {
    const newContact = await Contact.create(body)
    await sendContactEmail(body.email)
    return newContact
  },
}
