const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createNew = async (task, priority, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('tasks')
      .insertOne({
        task, priority, actualStatus: 'pendente', userId,
      }));

  return {
    task: {
      task,
      priority,
      actualStatus: 'pendente',
      userId,
      _id: insertedId,
    },
  };
};

const getTaskById = async (id) => {
  const task = await connection()
    .then((db) => db.collection('tasks')
      .findOne({ _id: ObjectId(id) }));

  if (task) return task;

  return false;
};

const getAllTask = async () => {
  const allTask = await connection()
    .then((db) => db.collection('tasks')
      .find().toArray());

  return allTask;
};

const updateTask = async (id, task, priority, actualStatus) => {
  const upTsk = await connection()
    .then((db) => db.collection('tasks')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { task, priority, actualStatus } },
        { returnOriginal: false },
      ));

  if (upTsk) return upTsk.value;

  return false;
};

const deleteTask = async (id) => {
  const deletedTask = await connection()
    .then((db) => db.collection('tasks')
      .findOneAndDelete(
        { _id: ObjectId(id) },
      ));

  if (deletedTask) return deletedTask.value;

  return false;
};

module.exports = {
  createNew,
  getTaskById,
  getAllTask,
  updateTask,
  deleteTask,
};
