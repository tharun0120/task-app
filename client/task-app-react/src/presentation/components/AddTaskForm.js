import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
const AddTaskForm = () => {
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
            // value={"text"}
            // onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-control">
          <p>Deadline: </p>
          <Datetime />
        </div>

        <div className="form-control form-control-check">
          <label>Priorotize:</label>
          <input
            className="priorotize-box"
            type="checkbox"
            // checked={remainder}
            // value={remainder}
            // onChange={(e) => setRemiainder(e.currentTarget.checked)}
          />
        </div>
        {/* <input type="submit" value="Add Task" className="btn btn-block" /> */}
      </form>
      <div className="btn-container">
        <button>Submit</button>
      </div>
    </div>
  );
};

export default AddTaskForm;
