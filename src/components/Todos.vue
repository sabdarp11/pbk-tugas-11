<template>
  <div>
    <h2>My Tasks</h2>
    <div class="tasks-list">
      <div class="task" v-for="(task, index) in tasks" :key="index">
        <input
          type="checkbox"
          v-model="task.completed"
          @input="markCompleted(task)"
        />
        <span :class="{ completed: task.completed }">{{ task.name }}</span>
        <button class="delete-button" @click="deleteTask(index)">Delete</button>
      </div>
    </div>
    <form @submit.prevent="addTask">
      <input
        type="text"
        v-model="newTaskName"
        placeholder="Add a new task..."
      />
      <button class="add-button" type="submit">Add</button>
    </form>
    <button class="filter-button" @click="filterTasks('all')">
      Show all tasks
    </button>
    <button class="filter-button" @click="filterTasks('active')">
      Show active tasks
    </button>
    <button class="filter-button" @click="filterTasks('completed')">
      Show completed tasks
    </button>
  </div>
</template>

<script>
export default {
  props: ["tasks"],
  data() {
    return {
      newTaskName: "",
    };
  },
  methods: {
    addTask() {
      this.$emit("add-task", this.newTaskName);
      this.newTaskName = "";
    },
    deleteTask(index) {
      this.$emit("delete-task", index);
    },
    markCompleted(task) {
      this.$emit("mark-completed", task);
    },
    filterTasks(filterType) {
      this.$emit("filter-tasks", filterType);
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.delete-button:hover {
  background-color: darkred;
}

.add-button {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: darkgreen;
}

.filter-button {
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.filter-button:hover {
  background-color: darkblue;
}
</style>
