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
						<img :src="book.image" width="300" height="450" />
						<div class="book-info-container">
							<h3>{{ book.title }}</h3>
							<p>{{ book.author }}</p>
							<p>{{ book.published_year }}</p>
							<ul class="genres">
								<li v-for="(genre, i) in book.genres" :key="i">
									{{ genre }}
								</li>
							</ul>
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
	overflow: hidden;
	max-width: 100100%;
	.hero-section {
		height: 100dvh;
		min-width: 100vw;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		overflow: hidden;
		h1 {
			margin-left: 2rem;
			margin-right: 2rem;
			font-family: $font-title;
			font-size: $h-medium;
			color: $color-white;
			z-index: 1;
		}
		img {
			position: absolute;
			top: 0;
			align-self: center;
			max-width: 100vw;
			min-height: 100dvh;
			object-fit: cover;
			filter: blur(4px) brightness(75%);
			overflow: hidden;
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
			min-width: 50vw;
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
			transition: 0.3s ease-in-out;
		}
		button:hover {
			background-color: $color-primary;
			span {
				color: $color-white;
				transition: 0.3s ease-in-out;
			}
		}
	}
	.book-list-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
}
.book {
	margin-inline: 1rem;
	article {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.25));
	}
	img {
		// max-width: 30%;
		// min-width: 30%;
		max-width: 30%;
		height: auto;

		scale: 2 / 3;
		object-fit: cover;
		// height: auto;
		// min-width: 15rem;
		z-index: 1;
		border-radius: 16px;
	}
	.book-info-container {
		position: relative;
		right: -25%;
		top: -12rem;
		background-color: $color-primary;
		min-width: 70%;
		max-width: 70%;
		min-height: 100%;
		border-radius: 16px;
		color: $color-white;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 2rem;
		padding-left: 2.5rem;
		h3 {
			font-family: $font-title;
			font-size: $h-small;
			margin-bottom: 2rem;
		}
		p {
			font-family: $font-paragraph;
			font-size: 1rem;
			opacity: 80%;
			margin-bottom: 1rem;
		}
		.genres {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			font-family: $font-paragraph;
			font-size: 1rem;
		}
		a {
			color: $color-white;
			font-family: $font-paragraph;
			background-color: $color-secondary;
			padding: 0.5rem;
			border-radius: 8px;
			border: none;
			display: inline-flex;
			align-items: center;
			text-decoration: none;
			margin-top: 2rem;
			box-shadow: $drop-shadow;
		}
	}
}

@media screen and (min-width: 768px) {
	.book {
		margin-inline: 10%;
		.book-info-container {
			padding-left: 4rem;
		}
	}
}

@media screen and (min-width: 1300px) {
	main {
		margin-top: 0;
		.hero-section {
			h1 {
				margin-left: 10rem;
			}
			img {
				min-width: 100vw;
				max-height: 100dvh;
			}
		}
	}
	.book-section {
		.search-form {
			input {
				min-width: 20vw;
			}
		}
		.book-list-container {
			display: grid;
			grid-template-columns: repeat(12, 1fr);
			width: 100vw;
			.book:nth-child(odd) {
				grid-column: 2 / span 5;
			}
			.book:nth-child(even) {
				grid-column: 7 / span 5;
			}
		}
	}
	.book {
		max-width: 90%;
		margin-bottom: 9rem;
		article {
			flex-direction: row;
		}
		img {
			max-width: 40%;
			min-width: 40%;
			height: 450px;
		}
		.book-info-container {
			position: absolute;
			right: 0;
			top: 1.5rem;
			min-width: 65%;
			max-width: 65%;
			min-height: 100%;
			padding: 4rem;
			padding-left: 6rem;
			a {
				position: absolute;
				bottom: 3rem;
				
			}
		}
	}
}
</style>
