const router = require('express').Router();
const usersServices = require('../services/usersServices');
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
  try {
    const users = await usersServices.getAllUsers();

    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
