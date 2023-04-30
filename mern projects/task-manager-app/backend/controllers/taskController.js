const Task = require("../models/taskModel");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      //for tasks that existed before in db but were removed
      return res.status(404).json(`there is no task with id ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json(`there is no task with id ${id}`);
    }
    res.status(200).send("task deleted");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const updatePutTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true, // so we can see the newly updated values not the old ones
      runValidators: true, // update method requires this so the db validator works
    });
    if (!task) {
      return res.status(404).json(`there is no task with id ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const updatePatchTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json(`there is no task with id ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updatePutTask,
  updatePatchTask,
};
