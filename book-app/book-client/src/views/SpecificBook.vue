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

const successMessage = ref('');

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

    successMessage.value = 'You submitted a Review!'
    setTimeout(() =>{
      successMessage.value = '';
    },3000);

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
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
        <p class="back-text">Back</p>
      </router-link>
    </div>
    <div class="book-section">
      <div class="book-section-left">
        <img :src="book.image" alt="Book cover" />
      </div>
      <div class="book-section-right">
        <h1>{{ book.title }}</h1>
        <p><span>Author:</span> {{ book.author }}</p>
        <p><span>Published:</span> {{ book.published_year }}</p>
        <ul>
          <p><span>Genres:</span></p>
          <li v-for="(genre, index) in book.genres" :key="index">{{ genre }}</li>
        </ul>
        <p><span>Description:</span> {{ book.description }}</p>
      </div>

    </div>
    <div class="review-section">
      <section class="make-review-section">
        <h2>Add a Review</h2>
        <form @submit.prevent="submitReview">
          <div>
            <label for="name">Name:</label>
            <input v-model="form.name" id="name" required />
          </div>
          <div>
            <label for="rating">Rating (1-5):</label>
            <select v-model.number="form.rating" id="rating" required>
              <option disabled value="">Select rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }} Star</option>
            </select>
          </div>
          <div>
            <label for="content">Review:</label>
            <textarea v-model="form.content" id="content" required></textarea>
          </div>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
          <button type="submit">Submit Review</button>
        </form>
      </section>
      <section class="reviews" v-if="book.reviews && book.reviews.length">
        <h2>Reviews:</h2>
        <ul>
          <li v-for="(review, i) in book.reviews" :key="i">
            <div>
              <p>{{ review.name }}</p>
              <img :src="`/assets/images/rating-star-${review.rating}.jpg`" :alt="`Rating: ${review.rating} stars`" />
            </div>
            <p>{{ review.content }}</p>
          </li>
        </ul>
      </section>
      <section v-else>
        <p>No reviews yet.</p>
      </section>

    </div>



  </main>
  <p v-else>Loading book...</p>
</template>


<style lang="scss" scoped>

main {
  padding-right: 40px;
  padding-left: 40px;
  background-color: $color-background;
  height: 100vh;
  width: 100%;
  .top-image {
    width: 100%;
    height: 400px;
    right: 0;
    img {
      width: 100%;
      /* Ensure the image fits within the container */
      height: 100%;
      /* Ensure the image fits within the container */
      object-fit: cover;
      object-position: center;
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
      font-family: $font-paragraph;
      color: black;
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

        .back-text {
          font-weight: bolder;
        }
      }
    }
  }

  .book-section {
    height: 700px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    right: 100px;
    gap: 100px;

    .owl {
      position: absolute;
      right: 0;
      bottom: 25px;

      path {
        fill: #BABABA;
      }
    }

    &-left {
      width: 325px;
      height: 500px;
      margin-left: 40px;
      border-radius: 16px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.692);

      img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
    }

    &-right {
      width: 600px;
      height: 500px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        :nth-child(2) {
          background-color: #7CFDC0;
        }

        :nth-child(3) {
          background-color: #7CE1FD;
        }

        :nth-child(4) {
          background-color: #8C979A;
        }

        :nth-child(5) {
          background-color: #EDAF95;
        }

        li {
          font-size: 1.4rem;
          width: auto;
          padding: 5px 5px;
          border-radius: 14px;
          font-family: $font-paragraph;
        }
      }

      h1 {
        font-family: $font-title;
        font-size: $h-medium;
      }

      p {
        font-family: $font-paragraph;
        font-size: 1.3rem;
        white-space: pre-line;
        font-weight: 200;
        line-height: 25px;

        span {
          font-weight: 500;
          font-size: 1.4rem;
        }
      }
    }
  }
  .review-section{
    width: 100%;
    padding-right: 40px;
    padding-left: 40px;
    height: 500px;
    display: flex;
    flex-direction: row;
    background-color: $color-primary;
    justify-content: space-between;
    gap: 50px;
    border-radius: 16px;
    .make-review-section {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 500px;
      gap: 20px;
      h2{
        font-family: $font-title;
        font-size: $h-small;
        color: white;
        height: 40px;
      }
      form{
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: auto;
        div{
          width: 600px;
          height: auto;
          display: flex;
          flex-direction: column;
          color: white;
          label{
            margin-bottom: 5px;
            font-size: 1.2rem;
          }
          input{
            width: 70%;
            height: 30px;
            border-radius: 10px;
            border: none;
            font-family: $font-paragraph;
            font-size: 0.9rem;
            &:focus{
              outline: none;
              border: 2px solid #4C1C29;
            }
          }
          textarea{
            height: 150px;
            width: 100%;
            padding: 5px 5px;
            border-radius: 10px;
            border: none;
            resize: none;
            font-size: 0.9rem;
            font-family: $font-paragraph;
            &:focus {
              outline: none;
              border: 2px solid #4C1C29;
            }
          }
          select{
            height: 30px;
            width: 70%;
            border-radius: 10px;
            border: none;
            font-family: $font-paragraph;
            font-size: 0.9rem;
              &:focus {
                outline: none;
                border: 2px solid #4C1C29;
              }
            option{
              border-radius: 10px;
              &:focus{
                 border-radius: 10px;
              }
            }
          }

        }
        .success-message{
          font-size: 1rem;
          font-family: $font-paragraph;
          color: rgb(24, 197, 125);
        }
        button{
          width: 130px;
          height: 40px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-family: $font-paragraph;
          font-weight: 700;
          outline: none;
          &:hover{
            background: rgb(219, 219, 219);
            border: 1px solid #4C1C29 ;
          }
        }
      }

  }

    .reviews {
      width: 50%;
      height: 450px;
      margin-top: 20px;
      margin-bottom: 20px;
      scroll-behavior: smooth;
      h2{
        color: white;
        font-family: $font-title;
        font-size: $h-small;
        margin-bottom: 20px;
      }
      ul{
        width: 100%;
        display: flex;
        height: 400px;
        flex-direction: column;
        gap: 30px;
        overflow-y: auto;
        scrollbar-width: none; 
        -ms-overflow-style: none; 
        &::-webkit-scrollbar{
         display: none;
        }
        li{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          gap: 20px;
          height: auto;
          width: 90%;
          border-bottom:2px solid white ;
          div{
              display: flex;
              flex-direction: column;
              gap: 15px;
            p{
              color: white;
              font-size: 1.5rem;
              font-family: $font-paragraph;
              text-transform: capitalize;
              

            }
          }
          p{
            color: white;
            font-size: 1rem;
            font-family: $font-paragraph;
            text-transform: capitalize;
            line-height: 20px;
            height: auto;
          }
        }
      }
    }

  }

}



@media (max-width: 767px) {
  main{
    padding-right: 20px ;
    padding-left: 20px;
    
    .top-image{
      display: none;
    }
    .book-section{
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      right: 0;
      gap: 25px;
      height: auto;
      &-left{
        display: flex;
        justify-items: center;
        align-items: center;
        margin-left: 0;
        height: 100%;
        img{
          object-fit: contain;

        }
      }
      &-right{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;
        margin-bottom: 20px;
        h1{
          font-size: $h-medium-mobile ; 
        }
        span{
          
        }
        p{
          font-weight: 400;
        }
        ul{
          height: 70px;
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
          
        }
      }
        .owl{
        display: none;
      }
    }
    .review-section{
      padding-right: 20px;
      padding-left:20px;
      width: 100%;
      flex-direction: column;
      justify-content: end;
      height: auto;
      padding-top: 20px;
      gap: 0;
      .make-review-section{
        width: 100%;
        form{ 
          height: auto;
          div{
            width: 100%;
            input{
              width: 100%;
            }
            select{
              width: 100%;
            }
          }
          button{
          width: 160px;
          height: 40px;
        }
        }

      }
      .reviews{
        width: 100%;
        ul{
          align-items: center;
          
          li{
            flex-direction: column;
            height: auto;
            border-bottom:2px solid white ;
            div{
              flex-direction: column;
              align-items: center;
              gap: 5px;
              img{
                width: 200px;
              }
            }
            p{
              text-align: center;
            }
          }
        }
      }
    }

  }
}


@media (min-width: 768px) and (max-width: 1024px) {
main{
  padding-right:20px;
  padding-left:20px;
  .book-section{
    flex-direction: column;
    right: 0;
    height: auto;
    margin-bottom: 10px;
    .owl{
      display: none;
    }
    gap: 0;
    align-items: center;
    &-left{
      margin-left:0;
      height: 450px;
      
      img{
        object-fit: cover;
      }
    }
    &-right{
      align-items: center;
      height: auto;
      display: flex;
      gap: 10px;
      h1{
        margin-top: 10px;
      }
    }
  }
  .review-section{
    padding-left:20px ;
    padding-right:20px ;

    .make-review-section{
      form{
        height: auto;
        div{
          width: 100%;
        }
      }
    }
    .reviews{
      ul{
        align-items: center;
        li{
          flex-direction: column;
          height: auto;
          div{
            flex-direction: column;
            align-items: center;
            img{
              width: auto;
            }
          }
          p{
            text-align: center;
          }
        }
      }
    }
  }
}

}

@media (min-width: 1025px) and (max-width: 1440px) {
  main{
    height: auto;
    .book-section{
      right: 0;
      .owl{
        display: none;
      }
      height: 550px;
      &-left{
        img{
          object-fit: cover;
        }
      }
      &-right{
        ul{
          display: flex;
          flex-wrap: wrap;
        }
        p{
          font-size: 1.1rem;
          line-height: 20px;
        }
      }
    }
    .review-section{
      .make-review-section{
        height: 100%;
        form{
          width: 100%;
          height: 370px;
          div{
            width: 100%;
          }
        }
      }
      .reviews{
        ul{
          li{
            height: 200px;
            width: 100%;
          }
        }
      }
    }
  }
}


</style>