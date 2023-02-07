const { ContactModel } = require('../models');
const { prepareResponse } = require('../helpers');

const add = async (req, res) => {
  const { name, email, phone, favorite = false } = req.body;
  const newContact = await ContactModel.create({
    name,
    email,
    phone,
    favorite,
  });
  res.status(201).json(prepareResponse(newContact));
};

module.exports = {
  add,
};
