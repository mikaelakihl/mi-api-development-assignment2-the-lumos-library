<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import axios from 'axios';

const route = useRoute();
const bookId = route.params.id;
const book = ref(null);
const API_URL = import.meta.env.VITE_API_URL;

const form = reactive({
  name: '',
  content: '',
  rating: ''
});

const fetchBook = async () => {
  try {
    const response = await axios.get(`${API_URL}books/${bookId}`);
    console.log('Book data:', response.data)
    book.value = response.data;
  } catch (error) {
    console.error('Error loading book:', error);
  }
};

const submitReview = async () => {
  try {
    const response = await axios.post(
      `${API_URL}reviews/books/${bookId}/reviews`,
      {
        name: form.name,  
        content: form.content,  
        rating: parseInt(form.rating),
        bookId: bookId
      }
    );

    await fetchBook();
    
    form.name = '';
    form.content = '';
    form.rating = '';
    
    alert('Review submitted successfully!');
    
  } catch (error) {
    console.error('Error submitting review:', error);
    alert(`Failed to submit review: ${error.response?.data?.message || error.message}`);
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

    <section>
      <h2>Add a Review</h2>
      <form @submit.prevent="submitReview">
        <div>
          <label for="name">Name:</label>
          <input v-model="form.name" id="name" required />
        </div>
        <div>
          <label for="content">Review:</label>
          <textarea v-model="form.content" id="content" required></textarea>
        </div>
        <div>
          <label for="rating">Rating (1-5):</label>
          <select v-model.number="form.rating" id="rating" required>
            <option disabled value="">Select rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </section>

    <section v-if="book.reviews && book.reviews.length">
        <h2>Reviews</h2>
        <ul>
            <li v-for="(review, i) in book.reviews" :key="i">
              <p><strong>{{ review.name }}:</strong> {{ review.content }}</p>
               <img :src="`/assets/images/rating-star-${review.rating}.jpg`" :alt="`Rating: ${review.rating} stars`" />
            </li>
        </ul>
    </section>
    <section v-else>
        <p>No reviews yet.</p>
    </section>
    

  </main>
  <p v-else>Loading book...</p>
</template>


<style lang="scss" scoped>

    h1{
        font-family: $font-title;
        color: $color-red;
    }

</style>