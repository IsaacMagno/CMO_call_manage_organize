const usersModels = require('../models/usersModels');
const {
  somethingWrong,
} = require('../errorTexts');

const create = async ({ name, email, password }) => {
  const regiteredUser = await usersModels.create({ name, email, password });

  return regiteredUser;
};

const getAllUsers = async () => {
  const users = await usersModels.getAllUsers();

  if (!users) return somethingWrong;

  return users;
};

module.exports = {
  create,
  getAllUsers,
};
