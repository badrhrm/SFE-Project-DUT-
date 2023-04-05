const Task = require("../models/Task");
const getAllTasks = async (req, res) => {
  //res.send("all items ");
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks }); //~json({tasks:tasks})
  } catch (error) {}
};

const createTask = async (req, res) => {
  //res.send('create task ');
  //res.json(req.body);
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = (req, res) => {
  //res.send('get single task');
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send("update all tasks");
};

const deleteTask = (req, res) => {
  res.send("delete all tasks");
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
