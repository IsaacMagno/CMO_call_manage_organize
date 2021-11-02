const tasksModels = require('../models/tasksModels');
const {
  somethingWrong,
} = require('../errorTexts');

const createNewTask = async (task, priority, userId) => {
  const newTask = tasksModels.createNew(task, priority, userId);

  return newTask;
};

const getTaskById = async (id) => {
  const task = tasksModels.getTaskById(id);

  if (!task) return somethingWrong;

  return task;
};

const getAllTask = async () => {
  const allTask = tasksModels.getAllTask();

  return allTask;
};

const updateTask = async (id, task, priority, status) => {
  const updatedTask = tasksModels.updateTask(id, task, priority, status);

  return updatedTask;
};

const deleteTask = async (id) => {
  const deletedTask = tasksModels.deleteTask(id);

  return deletedTask;
};

module.exports = {
  createNewTask,
  getTaskById,
  getAllTask,
  updateTask,
  deleteTask,
};
