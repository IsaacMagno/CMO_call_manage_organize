const loginModels = require('../models/loginModels');
const {
  userNotFound,
} = require('../errorTexts');

const login = async (email) => {
  const user = await loginModels.login(email);

  if (!user) return userNotFound;

  return user;
};

module.exports = {
  login,
};
