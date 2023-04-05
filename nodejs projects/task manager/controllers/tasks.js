const Task = require("../models/Task");
const getAllTasks = async (req, res) => {
  //res.send("all items ");
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks }); //~json({tasks:tasks})
  } catch (error) {
    res.status(500).json({ msg: error });
  }
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

const getTask = async (req, res) => {
  //res.send('get single task');
  //res.json({ id: req.params.id });
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = (req, res) => {
  res.send("update all tasks");
};

const deleteTask = async (req, res) => {
  // res.send("delete all tasks");
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` });
    }
    //here we have either one of the 3 and the first is the most used
    //res.status(200).send(); //here we just send the response that the request succeded
    res.status(200).json({ task: null, status: "success" });
    //res.status(200).json(task); //here we send ourselves the tasks'info just to tell us that it was deleted though it is not needed at all and this way is not used
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
