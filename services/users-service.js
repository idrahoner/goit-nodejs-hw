const bcrypt = require('bcrypt');
const { UserModel } = require('../models');

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

module.exports = {
  register,
};
