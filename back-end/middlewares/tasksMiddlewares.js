const {
  taskSchema,
  idSchema,
} = require('./joiValidator');
const {
  somethingWrong,
} = require('../errorTexts');

const taskValidation = async (req, res, next) => {
  try {
    const { task, priority } = req.body;

    const validate = await taskSchema.validateAsync({ task, priority });

    if (validate) return next();

    return res.status(400).json(somethingWrong);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const validateId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validate = await idSchema.validateAsync({ id });

    if (validate) return next();

    return res.status(400).json(somethingWrong);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  taskValidation,
  validateId,
};
