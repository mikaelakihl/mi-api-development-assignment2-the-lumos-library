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

    <div class="top-image">
      <img :src="book.image" alt="Book cover" />
    </div>
    <div class="back-btn-box">
      <router-link class="button-back" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
          <p class="back-text">Back</p>
      </router-link>
    </div>
    <div class="book-section">
      <div class="book-section-left">
        <img :src="book.image" alt="Book cover" />
      </div>
      <div class="book-section-right">
        <h1>{{ book.title }}</h1>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Published:</strong> {{ book.published_year }}</p>
        <p><strong>Description:</strong> {{ book.description }}</p>
        <p><strong>Genres:</strong></p>
        <ul>
          <li v-for="(genre, index) in book.genres" :key="index">{{ genre }}</li>
        </ul>
      </div>
    </div>
    
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
  main{
    .top-image{
      width: 100%;
      height: 400px;
      
      img{
          width: 100%;       /* Ensure the image fits within the container */
          height: 100%;      /* Ensure the image fits within the container */
          object-fit: cover; 
          object-position:  center;
          filter: blur(4px);
      }
    }
    .back-btn-box {
      width: 120px;
      height: 40px;
      margin-left: 40px;

      .button-back {
        display: flex;
        align-items: center;
        
        text-decoration: none;

        svg {
          width: 50px;
          height: 40px;
          transform: scale(0.7) translateX(0);
          transition: transform 0.5s ease-in-out;
        }

        .back-text {
          text-align: center;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          height: 100%;
          width: 60px;
        }

        &:hover {
          svg {
            transform: scale(0.7) translateX(-20px);  
          }
          .back-text{
            font-weight: bolder;
          }
        }
      }
    }

    .book-section{
      height: 75vh;
      width: 100%;
      &-left{
        width: 250px;
        height: 400px;
        margin-left: 40px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }

</style>