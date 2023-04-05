const getAllTasks = (req, res) => {
  res.send("all items ");
};

const createTask = (req, res) => {
  //res.send('create task ');
  res.json(req.body);
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
