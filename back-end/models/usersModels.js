const connection = require('./connection');

const getByMail = async (email) => {
  const emailFind = await connection()
    .then((db) => db.collection('users')
      .findOne({ email }));

  if (emailFind) return true;

  return false;
};

const create = async ({ name, email, password }) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users')
      .insertOne({
        name, email, password, role: 'user',
      }));

  return {
    user: {
      name,
      email,
      password,
      _id: insertedId,
    },
  };
};

const getAllUsers = async () => {
  const users = await connection()
    .then((db) => db.collection('users')
      .find().toArray());

  return users;
};

module.exports = {
  getByMail,
  create,
  getAllUsers,
};
