import { useState } from "react";

const Task = ({ task, onUpdate, onDelete }) => {
  const time = new Date(task.deadline);

  const togglePriority = () => {
    onUpdate({ id: task._id, prop: "priorotize", value: !task.priorotize });
  };
  const updateCompleted = (completed) => {
    onUpdate({ id: task._id, prop: "completed", value: completed });
  };
  const deleteTask = () => {
    onDelete(task._id);
  };
  return (
    <div>
      <div
        className={
          !task.priorotize ? "task-container" : "task-container task-border"
        }
        onDoubleClick={togglePriority}
      >
        <div className="check-text">
          <input
            type="checkbox"
            className="task-check"
            checked={task.completed}
            onChange={(e) => {
              updateCompleted(e.currentTarget.checked);
            }}
          />
          <p
            className={
              !task.completed ? "task-text" : "task-text task-completed"
            }
          >
            {task.description}
          </p>
          {task.completed && (
            <p
              className="task-delete-btn"
              onClick={() => {
                deleteTask();
              }}
            >
              delete
            </p>
          )}
        </div>
        <p className="task-time">
          {time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
      {/* <hr className="solid-divider"></hr> */}
    </div>
  );
};

export default Task;
