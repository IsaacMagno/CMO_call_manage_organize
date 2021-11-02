const jwt = require('jsonwebtoken');
const router = require('express').Router();
const secret = require('../secret');
const loginServices = require('../services/loginServices');
const {
  incorrectLogin,
} = require('../errorTexts');
const {
  loginValidation,
} = require('../middlewares/loginMiddlewares');

router.post('/', loginValidation, async (req, res) => {
  try {
    const loginParams = req.body;

    const user = await loginServices.login(loginParams.email);

    const {
      _id, email, role, password, error,
    } = user;

    if (error) return res.status(400).json({ error });

    if (email !== loginParams.email || password !== loginParams.password) {
      return res.status(401).json(incorrectLogin);
    }

    const data = { _id, email, role };

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(404).json({ error: err });
  }
});

module.exports = router;
