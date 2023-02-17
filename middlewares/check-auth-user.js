const jwt = require('jsonwebtoken');
const { generateError, responseErrors } = require('../helpers');
const { UserModel } = require('../models');

const { JWT_SECRET_KEY } = process.env;

const checkAuthUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log('   Authorization:    ', authorization);
    if (!authorization) throw generateError(responseErrors.unauthorized);

    const [tokenType, token] = authorization.split(' ');
    if (tokenType !== 'Bearer' || !token)
      throw generateError(responseErrors.unauthorized);

    const { userId } = jwt.verify(token, JWT_SECRET_KEY);

    const user = await UserModel.findById(userId);
    if (!user || user.token !== token)
      throw generateError(responseErrors.unauthorized);

    req.user = user;
    req.ownerId = userId;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAuthUser,
};
