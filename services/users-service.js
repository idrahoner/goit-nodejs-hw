const bcrypt = require('bcrypt');
const { UserModel } = require('../models');
const { generateError } = require('../helpers');

const register = async ({ email, password, subscription } = {}) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    email,
    password: hashPassword,
    subscription,
  });
  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  };
};

const login = async ({ email, password } = {}) => {
  const user = await UserModel.findOne({ email });
  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword)
    throw generateError({ status: 401, message: 'unauthorized' });
  return user;
};

module.exports = {
  register,
  login,
};
