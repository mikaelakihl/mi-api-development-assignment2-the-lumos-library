<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const isScrolled = ref(false);
const screenHieght = ref(0);

function checkScroll() {
    screenHieght.value = window.innerHeight * 0.75; // TODO: Korrigera värdet om det behövs
    console.log('Screenheight: ' + screenHieght.value);
    
    if(window.scrollY > screenHieght.value) {
        console.log(window.scrollY > screenHieght.value);
        isScrolled.value = true;

    }else {
        isScrolled.value = false;
    }
    
}

function addScrollListener() {
    window.addEventListener('scroll', checkScroll);
}

function removeScrollListener() {
    window.removeEventListener('scroll', checkScroll)
}

onMounted(addScrollListener);
onUnmounted(removeScrollListener);

</script>

<template>
    <header>
        <span class="logo-title">The lumos library</span>
        <!-- <RouterLink to="">Sign in/Register <span class="material-symbols-outlined">person</span></RouterLink> -->
        
        <nav class="mobile-menu">
            <RouterLink :class="{'scrolled': isScrolled}" to="/">Home</RouterLink>
            <RouterLink :class="{'scrolled': isScrolled}" to="">Admin</RouterLink>
            <RouterLink :class="{'scrolled': isScrolled}" to="">Sign in</RouterLink>
		</nav>
    </header>
</template>

<style lang="scss" scoped>
header {
    position: absolute;
    width: 100vw;
    height: 10dvh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo-title {
        font-family: $font-logo;
        font-size: $h-medium;
    }
}

nav {
    position: fixed;
    top: 15dvh;
    right: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    a {
        font-family: $font-paragraph;
        font-size: 1rem;
        color: $color-white;
        transition: 0.6s ease-in-out;
    }
    a.scrolled {
        color: $color-black;
    }
}
</style>