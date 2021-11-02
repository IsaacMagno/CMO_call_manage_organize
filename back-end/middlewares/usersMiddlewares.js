const { registerSchema } = require('./joiValidator');
const usersModels = require('../models/usersModels');
const {
  emailExists,
} = require('../errorTexts');

const bodyValidation = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const validate = await registerSchema.validateAsync({ username: name, email, password });

    const mailExists = await usersModels.getByMail(email);

    if (!mailExists && validate) return next();

    return res.status(400).json(emailExists);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  bodyValidation,
};
