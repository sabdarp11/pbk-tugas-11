import { createRouter, createWebHistory } from 'vue-router';
import Albums from '../components/Albums.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';

const routes = [
  {
    path: '/albums',
    name: 'Albums',
    component: Albums,
  },
  {
    path: '/albums/:userId/album/:albumId',
    name: 'AlbumPhotos',
    component: AlbumPhotos,
    props: true,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  // Jika diperlukan, tambahkan rute lainnya di sini
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
