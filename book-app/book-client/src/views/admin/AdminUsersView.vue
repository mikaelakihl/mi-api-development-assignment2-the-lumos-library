<script setup>
import AdminMenu from '@/components/admin/AdminMenu.vue';
import AdminTable from '@/components/admin/AdminTable.vue';

</script>

<template>
	<div class="admin-container">
        <AdminMenu />
		<section class="admin-content">
			<h2>Books</h2>
            <div class="table-container">
                <AdminTable 
                    dbTableName="users"
                    tableHeaderOne="username"
                    tableHeaderTwo="password"
                    tableHeaderThree="is_admin"
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
	}
    .table-container {
        grid-column: 3 / span 10;
    }
}
</style>