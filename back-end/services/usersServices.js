const usersModels = require('../models/usersModels');

const create = async ({ name, email, password }) => {
  const regiteredUser = await usersModels.create({ name, email, password });

  return regiteredUser;
};

module.exports = {
  create,
};
