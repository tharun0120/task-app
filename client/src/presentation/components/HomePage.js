import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/HomePage.css";

import TaskDataStore from "../../infrastructure/TaskDataStore";
import TaskCard from "./TaskCard";
import SideDrawer from "./SideDrawer";
import Loader from "./Loader";

const HomePage = ({ user, onLogout }) => {
  const history = useHistory();
  const mDataStore = new TaskDataStore(user);
  const [tasks, setTasks] = useState();
  useEffect(() => {
    if (user) {
      fetchAllTasks();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    onLogout();
    history.push("/login");
  };

  const fetchAllTasks = async () => {
    let res = await mDataStore.fetchAllTasks();

    res.match({
      tasks: (props) => {
        let tasks = props;
        if (Object.keys(tasks).length === 0) {
          tasks[new Date().toJSON().slice(0, 10)] = [];
        }
        setTasks(tasks);
      },
      invalidToken: () => {
        alert("Please login again.");
        logout();
      },
    });
  };

  const addTask = async (task) => {
    const date = task.deadline.slice(0, 10);
    let temp = JSON.parse(JSON.stringify(tasks));
    if (!temp.hasOwnProperty(date)) {
      temp[date] = [task];
    } else {
      temp[date].push(task);
    }
    const keys = Object.keys(temp);
    for (let i = 0; i < keys.length; i++) {
      if (temp[keys[i]].length === 0) {
        delete temp[keys[i]];
      }
    }
    setTasks(temp);
    let newtask = await mDataStore.createTask(task);
    let tempArr = temp[newtask.deadline.slice(0, 10)];
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i]["_id"] === 0) {
        tempArr[i]["_id"] = newtask["_id"];
      }
    }
    temp[newtask.deadline.slice(0, 10)] = tempArr;
    setTasks(temp);
  };

  const updateTaskServer = (props) => {
    mDataStore.updateTask(props);
  };

  const deleteTaskServer = (date, id) => {
    mDataStore.deleteTask(id);
    let temp = [];
    for (let i = 0; i < tasks[date].length; i++) {
      if (tasks[date][i]._id !== id) {
        temp.push(tasks[date][i]);
      }
    }
    tasks[date] = temp;
    if (temp.length === 0 && Object.keys(tasks).length > 1) {
      const tmp = JSON.parse(JSON.stringify(tasks));
      delete tmp[date];
      setTasks(tmp);
    }
  };

  if (!user) {
    history.push("/login");
    return <></>;
  } else if (!tasks) {
    return <Loader />;
  }

  return (
    <div className="app-container">
      <SideDrawer logout={logout} />
      <div className="hp-container">
        {Object.keys(tasks).map((date) => {
          return (
            <TaskCard
              className="taskcard"
              key={date}
              date={date}
              tasks={tasks[date]}
              addTask={addTask}
              updateTaskServer={updateTaskServer}
              deleteTaskServer={deleteTaskServer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
