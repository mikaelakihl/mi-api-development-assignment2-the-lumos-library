<script setup>
import { RouterView } from 'vue-router';
import MenuDesktop from './fixtures/MenuDesktop.vue';
import MenuMobile from './fixtures/MenuMobile.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import FooterComp from './components/FooterComp.vue';

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
 <nav>
  <RouterLink to="/">Hem</RouterLink> |
    <RouterLink to="/sign-in">Logga in</RouterLink>
 </nav>
  <footer>
    <FooterComp/>
  </footer>
</template>

<style scoped>

</style>
