const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    return res.status(200).json()
  } catch (err) {
    return res.status(404).json({ error: err });
  }
});

module.exports = router;