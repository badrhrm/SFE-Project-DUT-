import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import axios from "axios";
import loadingImg from "../assets/loader.gif";

function TaskList() {
  const [formData, setFormData] = useState({ name: "", completed: false });
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/v1/tasks`);
      setTasks(response.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (formData.name === "") {
      return toast.error("You must name your task.");
    }
    try {
      //await axios.post("http://127.0.0.1:3777/api/v1/tasks", formData);
      await axios.post(`/api/v1/tasks`, formData); //for deployment its better to make a proxy in json
      //to make things default and clear the form input for the next entry
      toast.success("Task added successfully.");
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      toast.success("Task deleted successfully.");
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (formData.name === "") {
      return toast.error("You must enter the new task name");
    }
    try {
      await axios.put(`/api/v1/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      toast.success("Task updated successfully.");
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };
    try {
      await axios.put(`/api/v1/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    const completedTasks = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(completedTasks);
  }, [tasks]);

  return (
    <>
      <h2>Task Manger</h2>
      <TaskForm
        name={formData.name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />

      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
          {tasks.length > 0 && (
            <>
              <b>Completed Tasks:</b> {completedTasks.length}
            </>
          )}
        </p>
      </div>

      <hr />

      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </>
  );
}

export default TaskList;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// // import { SERVER_URL } from "../App";
// import Task from "./Task";
// import TaskForm from "./TaskForm";
// import loadingImg from "../assets/loader.gif";

// // http://localhost:5000/api/tasks

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     completed: false,
//   });
//   const { name } = formData;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const getTasks = async () => {
//     setIsLoading(true);
//     try {
//       const { data } = await axios.get(`/api/v1/tasks`);
//       setTasks(data);
//       setIsLoading(false);
//     } catch (error) {
//       toast.error(error.message);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTasks();
//   }, []);

//   const createTask = async (e) => {
//     e.preventDefault();
//     if (name === "") {
//       return toast.error("Input field cannot be empty");
//     }
//     try {
//       await axios.post(`$/api/v1/tasks`, formData);
//       toast.success("Task added successfully");
//       setFormData({ ...formData, name: "" });
//       getTasks();
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Task Manager</h2>
//       <TaskForm
//         name={name}
//         handleInputChange={handleInputChange}
//         createTask={createTask}
//       />

//       <div className="--flex-between --pb">
//         <p>
//           <b>Total Tasks:</b> 0
//         </p>
//         <p>
//           <b>Completed Tasks:</b> 0
//         </p>
//       </div>

//       <hr />
//       {isLoading && (
//         <div className="--flex-center">
//           <img src={loadingImg} alt="Loading" />
//         </div>
//       )}
//       {!isLoading && tasks.length === 0 ? (
//         <p className="--py">No task added. Please add a task</p>
//       ) : (
//         <>
//           {tasks.map((task, index) => {
//             return <Task />;
//           })}
//         </>
//       )}
//     </div>
//   );
// };

// export default TaskList;
