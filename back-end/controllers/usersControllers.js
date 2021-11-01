const router = require('express').Router();
const usersServices = require('../models/usersModels');
const {
  bodyValidation,
} = require('../middlewares/usersMiddlewares');

router.post('/', bodyValidation, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = await usersServices.create({ name, email, password });

    return res.status(200).json(createUser);
  } catch (err) {
    return res.status(404).json({ err });
  }
});

router.get('/', async (_req, res) => {
  res.send();
});

module.exports = router;
