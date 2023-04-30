const express = require("express");
const router = express.Router();
const { logger } = require("../middleware/testMiddleware");
const {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updatePatchTask,
  updatePutTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", logger, getAllTasks);
router.get("/:id", getTask);
router.delete("/:id", deleteTask);
router.put("/:id", updatePutTask);
router.patch("/:id", updatePatchTask);

// //create a task
// router.post("/api/v1/tasks", createTask);

// //get all tasks
// router.get("/api/v1/tasks", logger, getAllTasks);

// //get a task
// router.get("/api/v1/tasks/:id", getTask);

// //delete a task
// router.delete("/api/v1/tasks/:id", deleteTask);

// // update Put Task a task
// router.put("/api/v1/tasks/:id", updatePutTask);

// // update Patch Task a task
// router.patch("/api/v1/tasks/:id", updatePatchTask);

module.exports = router;
