const router = require('express').Router();
const tasksServices = require('../services/tasksServices');
const validateJWT = require('../auth/validateJTW');
const {
  taskValidation,
  validateId,
} = require('../middlewares/tasksMiddlewares');

router.post('/', validateJWT, taskValidation, async (req, res) => {
  try {
    const { task, priority } = req.body;
    const { _id } = req.user;

    const newTask = await tasksServices.createNewTask(task, priority, _id);

    return res.status(200).json(newTask);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:id', validateId, async (req, res) => {
  try {
    const { id } = req.params;

    const task = await tasksServices.getTaskById(id);
    const { error } = task;

    if (error) return res.status(400).json(error);

    return res.status(200).json(task);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const allTask = await tasksServices.getAllTask();

    return res.status(200).json(allTask);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put('/:id', validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const { task, priority, status } = req.body;

    const updatedTask = await tasksServices.updateTask(id, task, priority, status);

    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', validateId, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await tasksServices.deleteTask(id);

    return res.status(200).json(deletedTask);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
