<script setup>
import AdminMenu from '@/components/admin/AdminMenu.vue';
import AdminTable from '@/components/admin/AdminTable.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
	<div class="admin-container">
		<AdminMenu />
		<section class="admin-content">
			<h2>Books</h2>
			<RouterLink to="/admin-books-add" class="add-new-book-btn"><span class="material-symbols-outlined">add</span>Add new book</RouterLink>
			<div class="table-container">
				<AdminTable
					dbTableName="books"
					tableHeaderOne="title"
					tableHeaderTwo="author"
					tableHeaderThree="genres"
					tableHeaderFour="created_at"
				/>
			</div>
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
		.add-new-book-btn {
			position: absolute;
			right: 3.5rem;
			top: 3.5rem;
			border: none;
			color: $color-white;
			background-color: $color-red;
			padding: 1rem;
			display: inline-flex;
			align-items: center;
			transition: 0.3s ease-in-out;
			border-radius: 8px;
			font-family: $font-paragraph;
			text-decoration: none;
			z-index: 0;
			cursor: pointer;
			span {
				margin-right: 0.5rem;
			}
		}
        .add-new-book-btn:hover {
            background-color: $color-secondary;
        }
	}
}
</style>
