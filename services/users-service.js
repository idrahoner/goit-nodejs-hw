const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');
const { generateError, responseErrors, constants } = require('../helpers');

const { JWT_SECRET_KEY } = process.env;

const register = async ({ email, password, subscription } = {}) => {
  const isEmailExisted = UserModel.findOne({ email });
  if (isEmailExisted) throw generateError(responseErrors.emailUsed);

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

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw generateError(responseErrors.unauthorized);

  const token = jwt.sign({ userId: user._id.valueOf() }, JWT_SECRET_KEY);
  const updatedUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    constants.DEFAULT_UPDATE_OPTIONS
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
    constants.DEFAULT_UPDATE_OPTIONS
  );
  return { email: updatedUser.email, subscription: updatedUser.subscription };
};

module.exports = {
  register,
  login,
  logout,
  updateUserStatus,
};
