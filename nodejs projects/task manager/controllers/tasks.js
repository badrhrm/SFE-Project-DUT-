const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  //res.send("all items ");
  const tasks = await Task.find({});
  //we can use various ones for other functionalities depends on what ur front ends require:
  res.status(200).json({ tasks }); //~json({tasks:tasks})
  //res.status(200).json({ tasks, amount: tasks.length }); //speciy amount shown
  //res.status(200).json({ status: "success", data: {tasks, nbHits: tasks.length} }); //mbHits: number of hits
  //to be removed : ?

  //res.status(500).json({ msg: error });
});

const createTask = asyncWrapper(async (req, res) => {
  //res.send('create task ');
  //res.json(req.body);
  const task = await Task.create(req.body);
  res.status(201).json({ task });

  //res.status(500).json({ msg: error });
});

const getTask = asyncWrapper(async (req, res, next) => {
  //res.send('get single task');
  //res.json({ id: req.params.id });
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  //res.send("update all tasks");

  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  // res.send("delete all tasks");

  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  //here we have either one of the 3 and the first is the most used
  //res.status(200).send(); //here we just send the response that the request succeded
  res.status(200).json({ task: null, status: "success" }); // i like this one
  //res.status(200).json(task); //here we send ourselves the tasks'info just to tell us that it was deleted though it is not needed at all and this way is not used
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
