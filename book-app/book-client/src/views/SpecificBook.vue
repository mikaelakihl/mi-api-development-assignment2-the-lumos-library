<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bookId = route.params.id;
const book = ref(null);
const API_URL = import.meta.env.VITE_API_URL;

const fetchBook = async () => {
  try {
    const response = await fetch(`${API_URL}books/${bookId}`);
    if (!response.ok) throw new Error('Failed to fetch book');
    book.value = await response.json();
  } catch (error) {
    console.error('Error loading book:', error);
  }
};

onMounted(fetchBook);
</script>

<template>
  <main v-if="book">
    <h1>{{ book.title }}</h1>
    <img :src="book.image" alt="Book cover" />
    <p><strong>Author:</strong> {{ book.author }}</p>
    <p><strong>Published:</strong> {{ book.published_year }}</p>
    <p><strong>Description:</strong> {{ book.description }}</p>
    <p><strong>Genres:</strong></p>
    <ul>
      <li v-for="(genre, index) in book.genres" :key="index">{{ genre }}</li>
    </ul>
  </main>
  <p v-else>Loading book...</p>
</template>


<style lang="scss" scoped>

</style>