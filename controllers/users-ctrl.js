const { usersService } = require('../services');

const register = async (req, res) => {
  const user = await usersService.register(req.body);
  res.status(201).json(user);
};

const login = async (req, res) => {
  const user = await usersService.login(req.body);
  res.status(200).json(user);
};

const logout = async (req, res) => {
  await usersService.logout(req.user);
  res.status(204).send();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

module.exports = {
  register,
  login,
  logout,
  current,
};
