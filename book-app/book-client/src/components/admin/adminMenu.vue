<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPage = computed(() => route.path);

console.log('Current page is: ' + currentPage.value);

</script>

<template>
    <section class="admin-menu">
			<h2>The<br />lumos<br />library</h2>
			<nav>
				<menu>
					<RouterLink to="/admin-users" class="menu-links" :class="{active: currentPage === '/admin-users'}">Users</RouterLink>
					<RouterLink to="/admin-books" class="menu-links" :class="{active: currentPage === '/admin-books'}">Books</RouterLink>
				</menu>
			</nav>
			<div class="user-info-container">
				<img class="profile-picture" src="@/assets/images/heroimg-fantasy-book.jpg" width="45" height="45" loading="lazy"/>
				<span class="username">Username</span>
			</div>
		</section>
</template>

<style lang="scss" scoped>
.admin-menu {
		grid-column: 1 / span 2;
		height: 100dvh;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: $color-primary;
		min-width: 20%;
		max-width: 20%;
		h2 {
            margin: 1rem;
			font-family: $font-logo;
			font-size: $h-small;
			color: $color-white;
			// max-width: 100%;
			overflow-wrap: break-word;
			white-space: normal;
			word-wrap: break-word;
		}
	}
	menu {
		position: absolute;
		top: 10rem;
		width: 100%;
        display: flex;
        flex-direction: column;
		.menu-links {
			color: $color-white;
			font-family: $font-paragraph;
			font-size: 1.5rem;
			padding: 1rem 0 1rem 2rem;
			margin-inline: 1rem;
			text-decoration: none;
            // width: 100%;
			border-radius: 8px;
		}
		.menu-links:hover {
			background-color: #101c1d;
			cursor: pointer;
		}
		.menu-links.active{
			background-color: #334b4c;
		}
	}
	.user-info-container {
		padding: 1rem 2rem 1rem 2rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		.profile-picture {
			border-radius: 50%;
		}
		.username {
			color: $color-white;
			font-family: $font-paragraph;
			font-size: $h-small-mobile;
		}
	}
</style>