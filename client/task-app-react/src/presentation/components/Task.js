const Task = ({ task }) => {
  return (
    <div>
      <div className="task-container">
        <div className="check-text">
          <input type="checkbox" className="task-check"></input>
          <p className="task-text">{task.text}</p>
        </div>
        <p className="task-time">{task.time}</p>
      </div>
      {/* <hr className="solid-divider"></hr> */}
    </div>
  );
};

export default Task;
