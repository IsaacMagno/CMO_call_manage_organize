const jwt = require('jsonwebtoken');
const secret = require('../secret');
const loginServices = require('../models/loginModels');
const {
  missingAuthToken,
} = require('../errorTexts');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json(missingAuthToken);

  try {
    const decoded = jwt.verify(token, secret);

    const user = await loginServices.login(decoded.data.email);

    const { error } = user;

    if (error) return res.status(401).json(error);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};
