import Task from "./Task";
import AddtaskForm from "./AddTaskForm";
import { useState } from "react";
const tasks = [
  { id: 1, text: "Pick up bran from scool", time: "8:00 AM" },
  { id: 2, text: "Pick up bran from scool", time: "8:00 AM" },
  { id: 3, text: "Pick up bran from scool", time: "8:00 AM" },
  { id: 4, text: "Pick up bran from scool", time: "8:00 AM" },
  { id: 5, text: "Pick up bran from scool", time: "8:00 AM" },
];
const TaskCard = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      <div className="card-container">
        <div className="card-header">
          <div className="c-info">
            <div>
              <h2 className="c-day">Friday, </h2>
              <p className="c-month">December</p>
            </div>
            <h3 className="c-date">10th</h3>
          </div>
          <p className="remaing-tasks">12 tasks</p>
          <button className="addtask-btn" onClick={toggleShowForm}>
            +
          </button>
        </div>
        {/* <hr className="solid-divider"></hr> */}
        {showForm ? (
          <div className="add-task-container">
            <AddtaskForm />
          </div>
        ) : (
          <div className="tasks-container">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
