class TaskDataStore {
  constructor(user) {
    this.user = user;
  }

  async fetchAllTasks() {
    // console.log(this.user);
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
}

export default TaskDataStore;
