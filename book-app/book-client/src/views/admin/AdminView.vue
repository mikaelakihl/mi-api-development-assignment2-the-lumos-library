<script setup>
import AdminMenu from '@/components/admin/AdminMenu.vue';
import { RouterLink } from 'vue-router';

</script>

<template>
	<div class="admin-container">
        <AdminMenu />
		<section class="admin-content">
			<h2>Admin Dashboard</h2>
			<div>
				<h3>What do you want to see?</h3>
				<RouterLink to="/admin-users">Users</RouterLink>
				<RouterLink to="/admin-books">Books</RouterLink>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
.admin-container {
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	.admin-content {
		grid-column: 3 / span 8;
	}
}
</style>
