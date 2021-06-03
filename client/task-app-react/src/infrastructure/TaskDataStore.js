class TaskDataStore {
  constructor(user) {
    this.user = user;
  }

  async fetchAllTasks() {
    let res = await fetch("/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.user.token,
      },
    });
    let resJSON = await res.json();
    return resJSON;
  }

  async createTask(task) {
    const { _id, ...req } = task;
    let res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.user.token,
      },
      body: JSON.stringify(req),
    });

    let resJSON = await res.json();
    return resJSON;
  }
  updateTask({ id, prop, value }) {
    fetch("/api/tasks/" + id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + this.user.token,
      },
      body: JSON.stringify({ [prop]: value }),
    });
  }
  deleteTask(id) {
    fetch("/api/tasks/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + this.user.token,
      },
    });
  }
}

export default TaskDataStore;
