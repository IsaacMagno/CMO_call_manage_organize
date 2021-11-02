const connection = require('./connection');

const login = async (email) => {
  const loginSucces = await connection()
    .then((db) => db.collection('users')
      .findOne({ email }));

  if (loginSucces) return loginSucces;

  return false;
};

module.exports = {
  login,
};
