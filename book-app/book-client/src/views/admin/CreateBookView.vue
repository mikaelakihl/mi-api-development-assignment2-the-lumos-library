<script setup>
import AdminMenu from '@/components/admin/AdminMenu.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const API_URL = import.meta.env.VITE_API_URL;
const router = useRouter();

const form = reactive({
	title: '',
	description: '',
	author: '',
	genres: '',
	image: '',
	published_year: null,
});

const submit = async () => {
	const { title, description, author, genres, image, published_year } = form;

	if (
		!title.trim() ||
		!description.trim() ||
		!author.trim() ||
		!genres.trim() ||
		!image.trim() ||
		published_year === null ||
		published_year === ''
	) {
		console.error('Please fill in all fields');
		return;
	}

	// Gets the string and separates every word and put it in an array.
	const arrayOfGenres = form.genres.split(/[\s,]+/).map((g) => g.trim()).filter((g) => g !== '');

    const newBook = {
        title,
        description,
        author,
        genres: arrayOfGenres,
        image,
        published_year: Number(published_year),
    }

	try {
		await fetch(API_URL + 'books', {
			method: 'POST',
			credentials: 'include', // For cookie handling
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newBook),
		});
		router.push('/admin-books');
	} catch (error) {
		console.log('Error creating book: ' + error);
	}
};
</script>

<template>
	<div class="admin-container">
		<AdminMenu />
		<section class="admin-content">
			<h2>Add new book</h2>
			<form class="create-book-form" @submit.prevent="submit">
				<label>
					<span>Title:</span>
					<input type="text" name="title" v-model="form.title" required />
				</label>
				<label>
					<span>Description:</span>
					<textarea rows="5" name="description" v-model="form.description" required />
				</label>
				<label>
					<span>Author:</span>
					<input type="text" name="author" v-model="form.author" required />
				</label>
				<label>
					<span>Genres:</span>
					<input type="text" name="genres" v-model="form.genres" required />
				</label>
				<label>
					<span>Image:</span>
					<input type="text" name="image" v-model="form.image" required />
				</label>
				<label>
					<span>Published year:</span>
					<input type="number" name="published_year" v-model="form.published_year" required />
				</label>
				<input class="reset-btn" type="reset" value="Reset form" />
				<input class="submit-btn" type="submit" value="Add new book" />
			</form>
		</section>
	</div>
</template>

<style lang="scss" scoped>
.admin-container {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	background-color: $color-primary;
	min-height: 100dvh;
	.admin-content {
		grid-column: 3 / span 10;
		min-height: 90dvh;
		margin: 1rem;
		background-color: $color-background;
		border-radius: 16px;
		h2 {
			font-family: $font-title;
			font-size: $h-medium;
			margin-top: 3rem;
			margin-left: 2rem;
			margin-bottom: 1rem;
		}
	}
	.create-book-form {
		border-top: 5px solid #f0ecde;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
		max-width: 40%;
		label {
			font-family: $font-title;
			font-size: $h-small-mobile;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			min-width: 100%;
		}
		input,
		textarea {
			font-family: $font-paragraph;
			font-size: 1rem;
			padding: 0.5rem;
			background-color: $color-red;
			color: $color-white;
			border: none;
			border-radius: 8px;
		}
		.submit-btn {
			background-color: $color-secondary;
		}
		.submit-btn,
		.reset-btn {
			padding: 0.5rem 1rem;
			min-width: 50%;
		}
	}
}
</style>
