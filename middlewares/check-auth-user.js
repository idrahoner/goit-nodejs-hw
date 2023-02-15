const jwt = require('jsonwebtoken');
const { generateError, responseErrors } = require('../helpers');
const { UserModel } = require('../models');

const { SECRET_KEY } = process.env;

const checkAuthUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw generateError(responseErrors.unauthorized);

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token)
      throw generateError(responseErrors.unauthorized);

    const { userId } = jwt.verify(token, SECRET_KEY);

    const user = await UserModel.findById(userId);
    if (!user) throw generateError(responseErrors.unauthorized);

    req.user = user;
    // req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAuthUser,
};
