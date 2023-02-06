const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  favorite: { type: Boolean },
});

const ContactModel = mongoose.model('contacts', contactSchema);

module.exports = {
  ContactModel,
};
