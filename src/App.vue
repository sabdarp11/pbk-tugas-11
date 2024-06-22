<template>
  <div class="app">
    <h1>MyApp</h1>
    <nav>
      <button @click="showTodos">Todos</button>
      <button @click="showPosts">Posts</button>
      <button @click="showAlbums">Albums</button>
    </nav>
    <div v-if="showing === 'todos'">
      <Todos :tasks="tasks"
             @add-task="addTask"
             @delete-task="deleteTask"
             @mark-completed="markCompleted"
             @filter-tasks="filterTasks" />
    </div>
    <div v-else-if="showing === 'posts'">
      <Posts :users="users"
             :posts="posts"
             @fetch-posts="fetchPosts"
             @fetch-users="fetchUsers" />
    </div>
    <div v-else-if="showing === 'albums'">
      <Albums :users="users"
              :albums="albums"
              @fetch-users="fetchUsers"
              @fetch-user-albums="fetchUserAlbums" />
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';
import Albums from './components/Albums.vue';

export default {
  components: {
    Todos,
    Posts,
    Albums
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
      albums: []
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
        this.showingTasks = this.tasks;
      } else if (filterType === 'active') {
        this.showingTasks = this.tasks.filter(task => !task.completed);
      } else if (filterType === 'completed') {
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
    showAlbums() {
      this.showing = 'albums';
      this.fetchUsers();
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
          this.fetchUserAlbums();
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchUserAlbums() {
      let allAlbums = [];
      Promise.all(this.users.map(user => {
        return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
          .then(response => response.json())
          .then(albums => {
            albums.forEach(album => {
              album.user = user;
            });
            allAlbums = allAlbums.concat(albums);
          })
          .catch(error => {
            console.error(`Error fetching albums for user ${user.id}:`, error);
          });
      })).then(() => {
        this.albums = allAlbums;
      });
    }
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.nav {
  margin-bottom: 20px;
}

.nav button {
  margin-right: 10px;
}
</style>
