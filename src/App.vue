<template>
  <div class="app">
    <h1>Header</h1>
    <nav>
      <button @click="showTodos">Todos</button>
      <button @click="showPosts">Post</button>
    </nav>
    <Todos v-if="showing === 'todos'" :tasks="tasks" @add-task="addTask" @delete-task="deleteTask" @mark-completed="markCompleted" @filter-tasks="filterTasks" />
    <Posts v-else-if="showing === 'posts'" :users="users" :posts="posts" @fetch-posts="fetchPosts" @fetch-users="fetchUsers" />
  </div>
</template>

<script>
import Todos from './Todos.vue';
import Posts from './Posts.vue';

export default {
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      showing: 'todos',
      tasks: [
        { name: 'Task 1', completed: false },
        { name: 'Task 2', completed: false },
        { name: 'Task 3', completed: true },
      ],
      users: [],
      posts: [],
    };
  },
  methods: {
    addTask(newTaskName) {
      if (newTaskName.trim()) {
        this.tasks.push({ name: newTaskName.trim(), completed: false });
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
  mounted() {
    this.fetchUsers();
  },
};
</script>
