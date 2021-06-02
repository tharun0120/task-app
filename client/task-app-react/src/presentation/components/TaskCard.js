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
  updateCompleted,
  updatePriority,
}) => {
  const [showForm, setShowForm] = useState(false);
  const day = new Date(date);
  const toggleShowForm = () => {
    setShowForm(!showForm);
  };
  const [tasksState, setTasksState] = useState(tasks);
  const addNewTask = async (task) => {
    setShowForm(false);
    await addTask(task);
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
            <h3 className="c-date">{day.getDate()}th</h3>
          </div>
          <p className="remaing-tasks">
            {tasksState.length} task{tasks.length > 1 && "s"}
          </p>
          <button className="addtask-btn" onClick={toggleShowForm}>
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
            {tasksState.map((tasksState) => (
              <Task key={tasksState._id} task={tasksState} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
