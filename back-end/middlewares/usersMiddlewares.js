const { schema, registerSchema } = require('./joiValidator');
const usersModels = require('../models/usersModels');
const {
  emailExists,
} = require('../errorTexts');

const bodyValidation = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const uName = await registerSchema.validateAsync({ username: name });
    const value = await schema.validateAsync({ email, password });

    const mailExists = await usersModels.getByMail(email);

    if (!mailExists && value && uName) return next();

    return res.status(400).json(emailExists);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  bodyValidation,
};
