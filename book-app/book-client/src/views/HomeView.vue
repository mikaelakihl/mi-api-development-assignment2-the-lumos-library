<script setup>

import { onMounted, ref } from 'vue';

const API_URL = import.meta.env.VITE_API_URL;
const books = ref([]);
// const searchQuery = ref('');

const fetchBooks = async () => {
  try {
    const response = await fetch(API_URL + 'books');
    
    if(!response.ok) {
      throw new Error(`HTTP-error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    books.value = data;
  }catch(error) {
    console.error('Error fetching books: ' + error) //TODO: Add better error-handling
  }
}

onMounted(fetchBooks);

</script>

<template>
  <h1>home</h1>
</template>

<style lang="scss">


</style>