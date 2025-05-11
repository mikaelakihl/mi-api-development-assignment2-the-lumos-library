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
	<main>
		<section class="hero-section">
			<h1>Legends awaits to be read<br />- explore enchanted tales</h1>
			<span class="material-symbols-outlined"> keyboard_arrow_down </span>
			<img />
		</section>
		<section>
			<h2>Books</h2>
			<form>
				<input
					type="search"
					id="search-input"
					name="search"
					placeholder="Search..."
					required
					aria-label="Search for books"
				/>
				<button type="submit">
          <span class="material-symbols-outlined"> search </span>
        </button>
			</form>
      <div class="book-list" id="book-list" v-for="book in books" :key="book._id">
        <article>
          <div class="book-container">
            <h3>{{ book.title }}</h3>
            <p>{{ book.author }}</p>
            <p>{{ book.published_year }}</p>
            <li v-for="(genre, i) in book.genres" :key="i">
              {{ genre }}
            </li>
          </div>
          <img :src="book.image"/> <!-- TODO: Add size and other relevant attributes for image-elements -->
        </article>
      </div>
		</section>
	</main>
</template>

<style lang="scss"></style>
