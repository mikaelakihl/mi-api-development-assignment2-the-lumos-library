<script setup>
import AdminMenu from '@/components/admin/AdminMenu.vue';
import AdminTable from '@/components/admin/AdminTable.vue';

</script>

<template>
	<div class="admin-container">
        <AdminMenu />
		<section class="admin-content">
			<h2>Users</h2>
            <div class="table-container">
                <AdminTable 
                    dbTableName="/users"
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
	display: flex;
    flex-direction: column;
    width: 100%;
    background-color: $color-primary;
    min-height: 100dvh;
	.admin-content {
		grid-column: 3 / span 10;
        min-height: 90dvh;
        margin: 5rem 1rem 1rem 1rem; 
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

@media screen and (min-width: 768px) {
    .admin-container {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        .admin-content {
            // width: auto;
            grid-column: 3 / span 10;
            margin: 1rem;
        }
    }
}

</style>