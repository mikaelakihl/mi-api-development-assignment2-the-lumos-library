<script setup>
import { RouterView } from 'vue-router';
import MenuDesktop from './fixtures/MenuDesktop.vue';
import MenuMobile from './fixtures/MenuMobile.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const isMobile = ref(window.innerWidth <= 767);
console.log('Is mobile?: ' + isMobile.value);

function updateWindowResize() {
  isMobile.value = window.innerWidth <= 767;
  console.log('Is mobile?:' + isMobile.value);
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
  <div>
    <MenuMobile v-if="isMobile" />
    <MenuDesktop v-else />
  </div>
  <RouterView />
  
</template>

<style scoped>

</style>
