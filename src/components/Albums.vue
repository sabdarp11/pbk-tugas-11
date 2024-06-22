<template>
  <div>
    <h1>Choose a User:</h1>
    <select v-model="selectedUserId" @change="selectUser">
      <option value="">Select a user...</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <h2 v-if="selectedUser">Albums for User "{{ selectedUser.name }}"</h2>
    <div class="album-grid" v-if="selectedUser">
      <div class="album-item" v-for="album in albums" :key="album.id" @click="selectAlbum(album.id)">
        <img v-if="album.coverPhoto" :src="album.coverPhoto.thumbnailUrl" :alt="album.coverPhoto.title" />
        <div class="album-title">{{ album.title }}</div>
      </div>
    </div>

    <AlbumPhotos v-if="selectedAlbum" :album="selectedAlbum" />
  </div>
</template>

<script>
import AlbumPhotos from './AlbumPhotos.vue';

export default {
  components: {
    AlbumPhotos,
  },
  data() {
    return {
      users: [],
      selectedUserId: null,
      selectedUser: null,
      albums: [],
      selectedAlbumId: null,
      selectedAlbum: null,
    };
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchAlbums(userId) {
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then(response => response.json())
        .then(albums => {
          // Ambil gambar cover untuk setiap album
          Promise.all(albums.map(album => this.fetchCoverPhoto(album.id)))
            .then(coverPhotos => {
              this.albums = albums.map((album, index) => ({
                ...album,
                coverPhoto: coverPhotos[index],
              }));
            })
            .catch(error => {
              console.error(`Error fetching cover photos for albums:`, error);
            });
        })
        .catch(error => {
          console.error(`Error fetching albums for user ${userId}:`, error);
        });
    },
    fetchCoverPhoto(albumId) {
      return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=1`)
        .then(response => response.json())
        .then(photos => {
          return photos.length > 0 ? photos[0] : null;
        })
        .catch(error => {
          console.error(`Error fetching cover photo for album ${albumId}:`, error);
          return null;
        });
    },
    selectUser() {
      if (!this.selectedUserId) {
        this.selectedUser = null;
        this.albums = [];
        this.selectedAlbum = null;
        return;
      }
      
      this.selectedUser = this.users.find(user => user.id === this.selectedUserId);
      this.fetchAlbums(this.selectedUserId); // Fetch albums for the selected user
    },
    selectAlbum(albumId) {
      this.selectedAlbumId = albumId;
      this.selectedAlbum = this.albums.find(album => album.id === albumId);
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

select {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.album-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.album-item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.album-title {
  font-size: 14px;
  text-align: center;
}
</style>
