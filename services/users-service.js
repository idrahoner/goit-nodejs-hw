const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');
const { generateError, responseErrors } = require('../helpers');

const { SECRET_KEY } = process.env;

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
  if (!validatePassword) throw generateError(responseErrors.unauthorized);
  const token = jwt.sign({ userId: user._id.valueOf() }, SECRET_KEY);
  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

module.exports = {
  register,
  login,
};
