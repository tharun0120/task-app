import Task from "./Task";
import AddtaskForm from "./AddTaskForm";
import { useState } from "react";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const TaskCard = ({
  date,
  tasks,
  addTask,
  updateTaskServer,
  deleteTaskServer,
}) => {
  const [showForm, setShowForm] = useState(false);
  const day = new Date(date);
  const toggleShowForm = () => {
    setShowForm(!showForm);
  };
  const [tasksState, setTasksState] = useState(tasks);
  const addNewTask = async (task) => {
    setShowForm(false);
    if (date === task.deadline.slice(0, 10)) {
      const temp = [...tasksState, task];
      setTasksState(temp);
    }
    await addTask(task);
  };
  const sortTask = (tasks) => {
    const temp = [];
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].completed) {
        temp.push(tasks[i]);
      }
    }
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed) {
        temp.push(tasks[i]);
      }
    }
    return temp;
  };
  const updateTask = ({ id, prop, value }) => {
    updateTaskServer({ id, prop, value });
    const temp = [];
    for (let i = 0; i < tasksState.length; i++) {
      if (tasksState[i]._id === id) {
        tasksState[i][prop] = value;
        temp.push(tasksState[i]);
      } else {
        temp.push(tasksState[i]);
      }
    }
    setTasksState(temp);

    // return temp;
  };

  const deleteTask = (id) => {
    deleteTaskServer(date, id);
    const temp = [];
    for (let i = 0; i < tasksState.length; i++) {
      if (tasksState[i]._id !== id) {
        temp.push(tasksState[i]);
      }
    }
    setTasksState(temp);
  };
  return (
    <div>
      <div className="card-container">
        <div className="card-header">
          <div className="c-info">
            <div>
              <h2 className="c-day">{days[day.getDay()]}, </h2>
              <p className="c-month">{months[day.getMonth()]}</p>
            </div>
            <h3 className="c-date">{day.getDate()}</h3>
          </div>
          <p className="remaing-tasks">
            {tasksState.length} task{tasks.length > 1 && "s"}
          </p>
          <button
            className={showForm ? "addtask-btn addtask-anim" : "addtask-btn"}
            onClick={toggleShowForm}
          >
            +
          </button>
        </div>
        {/* <hr className="solid-divider"></hr> */}
        {showForm ? (
          <div className="add-task-container">
            <AddtaskForm day={day} onAdd={addNewTask} />
          </div>
        ) : (
          <div className="tasks-container">
            {tasksState.length === 0 && (
              <p className="no-task-text">No Tasks to show</p>
            )}
            {sortTask(tasksState).map((task) => (
              <Task
                key={task._id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
