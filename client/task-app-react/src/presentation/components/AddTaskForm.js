import Datetime from "react-datetime";
import { useState } from "react";

import "react-datetime/css/react-datetime.css";
const AddTaskForm = ({ day, onAdd }) => {
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState(day);
  const [priority, setPriority] = useState(false);
  const onSubmit = () => {
    if (!taskText) {
      alert("Task field can't be empty");
    }
    onAdd({
      _id: 0,
      description: taskText,
      deadline: deadline.toJSON(),
      priorotize: priority,
    });
  };
  return (
    <div>
      <h1>Add Task</h1>
      <form
        className="add-form"
        //   onSubmit={onSubmit}
      >
        <div className="form-control">
          <label>Task:</label>
          <input
            className="task-field"
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </div>
        <div className="form-control">
          <p>Deadline: </p>
          <Datetime
            initialValue={deadline}
            initialViewMode="time"
            onChange={(e) => {
              setDeadline(e.toDate());
            }}
          />
        </div>

        <div className="form-control form-control-check">
          <label>Priorotize:</label>
          <input
            className="priorotize-box"
            type="checkbox"
            checked={priority}
            onChange={(e) => setPriority(e.currentTarget.checked)}
          />
        </div>
        {/* <input type="submit" value="Add Task" className="btn btn-block" /> */}
      </form>
      <div className="btn-container">
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddTaskForm;
