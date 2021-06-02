import { useState } from "react";

const Task = ({ task }) => {
  const time = new Date(task.deadline);
  const [completed, setCompleted] = useState(task.completed);
  const [priority, setPriority] = useState(false);

  // time.ge
  return (
    <div>
      <div className="task-container task-border">
        <div className="check-text">
          <input type="checkbox" className="task-check"></input>
          <p className="task-text">{task.description}</p>
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
