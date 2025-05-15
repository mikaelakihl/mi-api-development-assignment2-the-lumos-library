<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const scrollDown = () => {
	window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
};

const API_URL = import.meta.env.VITE_API_URL;
const books = ref([]);
const searchQuery = ref('');

const fetchBooks = async () => {
	try {
		console.log('1: Initiate fetch');
		const URL = searchQuery.value ? `${API_URL}books?search=${searchQuery.value}` : `${API_URL}books`;
		console.log('2: Check API-URL' + URL);

		const response = await fetch(URL);

		if (!response.ok) {
			throw new Error(`HTTP-error: ${response.status}`);
		}

		const data = await response.json();
		console.log('3: Log fetched data: ' + data);
		books.value = data;
	} catch (error) {
		console.error('Error fetching books: ' + error); //TODO: Add better error-handling
	}
};

onMounted(fetchBooks);
</script>

<template>
	<main>
		<section class="hero-section">
			<h1>Legends awaits to be read<br />- explore enchanted tales</h1>
			<span class="material-symbols-outlined" @click="scrollDown"> keyboard_arrow_down </span>
			<img src="/assets/images/heroimg.jpg" />
		</section>
		<section class="book-section">
			<h2>Books</h2>
			<form class="search-form" id="search-form" @submit.prevent="fetchBooks">
				<input
					type="search"
					id="search-input"
					name="search"
					placeholder="Search..."
					required
					aria-label="Search for books"
					v-model="searchQuery"
				/>
				<button type="submit">
					<span class="material-symbols-outlined"> search </span>
				</button>
			</form>
			<div class="book-list-container">
				<div class="book" id="book-list" v-for="book in books" :key="book._id">
					<article>
						<img :src="book.image" />
						<div class="book-container">
							<h3>{{ book.title }}</h3>
							<p>{{ book.author }}</p>
							<p>{{ book.published_year }}</p>
							<li v-for="(genre, i) in book.genres" :key="i">
								{{ genre }}
							</li>
							<RouterLink :to="`/books/${book._id}`"
								>Read more<span class="material-symbols-outlined"> trending_flat </span></RouterLink
							>
						</div>
						<!-- TODO: Add size and other relevant attributes for image-elements -->
					</article>
				</div>
			</div>
		</section>
	</main>
</template>

<style lang="scss">
main {
	margin-top: 5rem;
}

@media screen and (min-width: 768px) {
	main {
		margin-top: 0;
		overflow: hidden;
		.hero-section {
			height: 100dvh;
			min-width: 100vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			h1 {
				margin-left: 10rem;
				font-family: $font-title;
				font-size: $h-medium;
				color: $color-white;
				z-index: 1;
			}
			img {
				// box-shadow: inset 83em 53em 1350px rgb(0, 0, 0);
				position: absolute;
				top: 0;
				align-self: center;
				min-width: 100vw;
				max-height: 100dvh;
				object-fit: cover;
				filter: blur(4px);
			}
			span {
				z-index: 1;
				position: absolute;
				bottom: 5rem;
				left: 50%;
				color: $color-white;
				font-size: $h-medium;
				cursor: pointer;
			}
			span:hover {
				color: $color-secondary;
			}
		}
	}
	.book-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		h2 {
			font-family: $font-title;
			font-size: $h-large;
			margin-top: 7rem;
		}
		.search-form {
			position: relative;
			margin-bottom: 5rem;
			margin-top: 5rem;
			filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
			input {
				background-color: $color-secondary;
				border: none;
				border-radius: 16px;
				padding: 0.7rem;
				min-width: 20vw;
				color: $color-white;
			}
			input::placeholder {
				color: $color-white;
				opacity: 70%;
			}
			button {
				width: 3rem;
				height: 3rem;
				border: none;
				border-radius: 50%;
				position: absolute;
				right: -1.5rem;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		.book-list-container {
			display: grid;
			grid-template-columns: repeat(12, 1fr);
			.book:nth-child(odd) {
				grid-column: 2 / span 5;
			}
			.book:nth-child(even) {
				grid-column: 7 / span 5;
			}
		}
		.book {
			max-width: 100%;
			img {
				max-width: 100%;
			}
		}
	}
}
</style>
