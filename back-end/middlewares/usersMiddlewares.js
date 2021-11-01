const { schema } = require('./joiValidator');

const bodyValidation = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const value = await schema.validateAsync({ username: name, email, password });
    if (value) return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  bodyValidation,
};
