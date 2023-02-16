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
  if (!user) throw generateError(responseErrors.unauthorized);

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) throw generateError(responseErrors.unauthorized);

  const token = jwt.sign({ userId: user._id.valueOf() }, SECRET_KEY);
  const updatedUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    { returnDocument: 'after', runValidators: true }
  );
  return {
    token: updatedUser.token,
    user: { email: updatedUser.email, subscription: updatedUser.subscription },
  };
};

const logout = async (user) => {
  await UserModel.findByIdAndUpdate(user._id, { token: null });
};

const updateUserStatus = async ({ subscription } = {}, userId) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { subscription },
    { returnDocument: 'after', runValidators: true }
  );
  return { email: updatedUser.email, subscription: updatedUser.subscription };
};

module.exports = {
  register,
  login,
  logout,
  updateUserStatus,
};
