<template>
  <div class="app">
    <h1>Header</h1>
    <nav>
      <button @click="showTodos">Todos</button>
      <button @click="showPosts">Post</button>
    </nav>
    <div v-if="showing === 'todos'">
      <h2>My Tasks</h2>
      <div class="tasks-list">
        <div class="task" v-for="(task, index) in filteredTasks" :key="index">
          <input type="checkbox" v-model="task.completed" @input="markCompleted(task)">
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
    <div v-else-if="showing === 'posts'">
      <h2>Posts</h2>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div class="posts">
        <div class="post" v-for="post in filteredPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showing: 'todos',
      tasks: [
        { name: 'Task 1', completed: false },
        { name: 'Task 2', completed: false },
        { name: 'Task 3', completed: true },
      ],
      newTaskName: '',
      users: [],
      posts: [],
      selectedUser: 1 // Default user
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
      if (filterType === 'all') {
        // Show all tasks
        this.showingTasks = this.tasks;
      } else if (filterType === 'active') {
        // Show active tasks
        this.showingTasks = this.tasks.filter(task => !task.completed);
      } else if (filterType === 'completed') {
        // Show completed tasks
        this.showingTasks = this.tasks.filter(task => task.completed);
      }
    },
    showTodos() {
      this.showing = 'todos';
    },
    showPosts() {
      this.showing = 'posts';
      this.fetchPosts();
    },
    fetchPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
          this.posts = posts;
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => post.userId === this.selectedUser);
    },
    filteredTasks() {
      // Initial show all tasks
      if (!this.showingTasks) {
        return this.tasks;
      }
      return this.showingTasks;
    }
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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