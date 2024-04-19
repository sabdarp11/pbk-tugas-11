<template>
  <div class="tasks">
    <h1>My Tasks</h1>
    <div class="tasks-list">
      <div class="task" v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" v-model="task.completed" @change="markCompleted(task)">
        <span :class="{ completed: task.completed }">{{ task.name }}</span>
        <button class="delete-button" @click="deleteTask(index)">Delete</button>
      </div>
    </div>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="Add a new task...">
      <button class="add-button" type="submit">Add</button>
    </form>
    <button class="filter-button" @click="filterTasks('all')">Show all tasks</button>
    <button class="filter-button" @click="filterTasks('active')">Show active tasks</button>
    <button class="filter-button" @click="filterTasks('completed')">Show completed tasks</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { name: 'Task 1', completed: false },
        { name: 'Task 2', completed: false },
        { name: 'Task 3', completed: true },
      ],
      newTaskName: '',
    };
  },
  methods: {
    addTask() {
      if (this.newTaskName.trim()) {
        this.tasks.push({ name: this.newTaskName.trim(), completed: false });
        this.newTaskName = '';
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    markCompleted(task) {
      task.completed = !task.completed;
    },
    filterTasks(filterType) {
      if (filterType === 'active') {
        this.tasks = this.tasks.filter(task => !task.completed);
      } else if (filterType === 'completed') {
        this.tasks = this.tasks.filter(task => task.completed);
      }
    },
  },
  mounted() {
    this.filterTasks('all');
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