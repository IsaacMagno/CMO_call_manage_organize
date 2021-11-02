const { loginSchema } = require('./joiValidator');
const {
  somethingWrong,
} = require('../errorTexts');

const loginValidation = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validate = await loginSchema.validateAsync({ email, password });

    if (validate) return next();

    return res.status(400).json(somethingWrong);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports = {
  loginValidation,
};
