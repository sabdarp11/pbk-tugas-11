<template>
  <div>
    <h2>Posts</h2>
    <select v-model="selectedUser" @change="fetchPosts">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div class="posts">
      <div class="post" v-for="post in filteredPosts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["users", "posts"],
  data() {
    return {
      selectedUser: null,
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => post.userId === this.selectedUser);
    },
  },
  methods: {
    fetchPosts() {
      this.$emit("fetch-posts", this.selectedUser);
    },
  },
  mounted() {
    this.$emit("fetch-users");
    if (this.users.length > 0) {
      this.selectedUser = this.users[0].id;
      this.fetchPosts();
    }
  },
};
</script>
