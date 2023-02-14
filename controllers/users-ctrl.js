const { usersService } = require('../services');

const register = async (req, res) => {
  const user = await usersService.register(req.body);
  res.status(201).json(user);
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
