import React from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const Task = ({ task, index, deleteTask, getSingleTask, setToComplete }) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}# </b>
        <i>{task.name}</i>
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setToComplete(task)} />
        <FaEdit color="orange" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};

export default Task;
