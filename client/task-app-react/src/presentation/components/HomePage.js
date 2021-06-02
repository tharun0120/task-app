import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/HomePage.css";

import TaskDataStore from "../../infrastructure/TaskDataStore";
import TaskCard from "./TaskCard";
import AppBar from "./AppBar";
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
    let tasks = await mDataStore.fetchAllTasks();
    if (Object.keys(tasks).length === 0) {
      tasks[new Date().toJSON().slice(0, 10)] = [];
    }
    setTasks(tasks);
  };

  const addTask = async (task) => {
    const date = task.deadline.slice(0, 10);

    if (!tasks.hasOwnProperty(date)) {
      tasks[date] = [task];
    } else {
      tasks[date].push(task);
    }
    setTasks(tasks);
    let newtask = await mDataStore.createTask(task);
    let temp = tasks[newtask.deadline.slice(0, 10)];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]["_id"] == 0) {
        temp[i]["_id"] = newtask["_id"];
      }
    }
    tasks[newtask.deadline.slice(0, 10)] = temp;
    console.log(tasks, temp);
  };

  const updateCompleted = async () => {};

  const updatePriority = async () => {};

  if (!user) {
    history.push("/login");
    return <></>;
  } else if (!tasks) {
    return <Loader />;
  }

  // const tasksComponent = (tasks) => {
  //   for (var key in tasks) {
  //     if(tasks.hasOwnProperty(key)) {

  //     }
  //   }
  // }

  return (
    <div className="app-container">
      <AppBar logout={logout} />
      <div className="hp-container">
        {Object.keys(tasks).map((date) => {
          return (
            <TaskCard
              className="taskcard"
              key={date}
              date={date}
              tasks={tasks[date]}
              addTask={addTask}
              updateCompleted={updateCompleted}
              updatePriority={updatePriority}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
