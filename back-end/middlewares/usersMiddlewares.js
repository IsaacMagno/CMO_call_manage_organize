const { schema } = require('./joiValidator');
const usersModels = require('../models/usersModels');

const bodyValidation = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const value = await schema.validateAsync({ username: name, email, password });
    const emailExists = await usersModels.getByMail(email);
    if (!emailExists && value) return next();
    return res.status(400).json({ error: 'Email already exists' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  bodyValidation,
};
