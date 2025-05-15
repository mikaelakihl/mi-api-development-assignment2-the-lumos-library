<script setup>
import { RouterView, useRoute } from 'vue-router';
import MenuDesktop from './fixtures/MenuDesktop.vue';
import MenuMobile from './fixtures/MenuMobile.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';

// const isLoggedIn = ref(true); // TODO: Fixa authentisering

const route = useRoute();

function checkIfAdminPage() {
	return route.path.startsWith('/admin');
}

const isAdminPage = computed(checkIfAdminPage);

// -----------------------------------------------------------

const isMobile = ref(window.innerWidth <= 767);


function updateWindowResize() {
	isMobile.value = window.innerWidth <= 767;	
}

function setupResizeListener() {
	window.addEventListener('resize', updateWindowResize);
}

function removeResizeListener() {
	window.removeEventListener('resize', updateWindowResize);
}

onMounted(setupResizeListener);
onUnmounted(removeResizeListener);
</script>



<template>
	<div v-if="!isAdminPage">
		<MenuMobile v-if="isMobile" />
		<MenuDesktop v-else />
	</div>
	<RouterView />
</template>

<style scoped></style>
