<template>
    <div>
      <h2>Photos in Album "{{ album.title }}"</h2>
      <div class="photos">
        <div v-for="photo in photos" :key="photo.id" @click="openLightbox(photo)">
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
        </div>
      </div>
      <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
        <img :src="selectedPhoto.url" :alt="selectedPhoto.title" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['album'],
    data() {
      return {
        photos: [],
        lightboxOpen: false,
        selectedPhoto: null
      };
    },
    methods: {
      fetchPhotos(albumId) {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
          .then(response => response.json())
          .then(photos => {
            this.photos = photos;
          })
          .catch(error => {
            console.error(`Error fetching photos for album ${albumId}:`, error);
          });
      },
      openLightbox(photo) {
        this.lightboxOpen = true;
        this.selectedPhoto = photo;
      },
      closeLightbox() {
        this.lightboxOpen = false;
        this.selectedPhoto = null;
      }
    },
    watch: {
      album: {
        handler(newAlbum) {
          if (newAlbum) {
            this.fetchPhotos(newAlbum.id);
          }
        },
        immediate: true
      }
    }
  };
  </script>
  
  <style scoped>
  .photos {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .photos img {
    max-width: 100%;
    cursor: pointer;
  }
  
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .lightbox img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
  </style>
  